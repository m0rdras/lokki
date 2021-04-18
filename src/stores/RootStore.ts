import debug from 'debug';
import { ipcRenderer } from 'electron';
import { autorun, IReactionDisposer } from 'mobx';
import { getEnv, Instance, SnapshotIn, types } from 'mobx-state-tree';

import { CryptResponse, Events } from '../Constants';
import { CryptStore } from './CryptStore';
import { GpgKeyStore } from './GpgKeyStore';
import { SettingsStore } from './SettingsStore';

const log = debug('lokki:rootStore');

export const RootStore = types
  .model('RootStore', {
    cryptStore: CryptStore,
    gpgKeyStore: GpgKeyStore,
    settingsStore: SettingsStore,
  })
  .actions((self) => {
    let disposer: IReactionDisposer;

    const onInputChange = async () => {
      const payload = {
        recipients: self.gpgKeyStore.selectedKeyIds,
        text: self.cryptStore.input.val,
      };
      log('Sending to main: %O', payload);
      self.cryptStore.setPending(true);
      const { text }: CryptResponse = await getEnv(self).ipcRenderer.invoke(
        Events.CRYPT,
        payload
      );
      self.cryptStore.output.setText(text);
      self.cryptStore.setPending(false);
    };

    return {
      load() {
        return Promise.all([
          self.settingsStore.load(),
          self.gpgKeyStore.load(),
        ]);
      },
      afterCreate() {
        disposer = autorun(() => onInputChange());
      },
      beforeDestroy() {
        disposer();
      },
    };
  });
export type IRootStore = Instance<typeof RootStore>;

export default function createRootStore(ipc = ipcRenderer): IRootStore {
  const snapshot: SnapshotIn<typeof RootStore> = {
    cryptStore: {
      input: {
        val: '',
      },
      output: {
        val: '',
      },
      pending: false,
    },
    gpgKeyStore: {
      gpgKeys: {},
      selectedKeys: [],
    },
    settingsStore: {
      gpgPath: 'gpg',
    },
  };
  const deps = { ipcRenderer: ipc };
  return RootStore.create(snapshot, deps);
}
