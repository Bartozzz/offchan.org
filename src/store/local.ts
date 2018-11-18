import LocalForage from "localforage";

// This must be called before any other calls to localForage are made, but can
// be called after localForage is loaded.
LocalForage.config({
  name: "offchan-org",
  storeName: "offchan-org-store",
  version: 1.0
});

export default LocalForage;
export const formStore = LocalForage.createInstance({ name: "form" });
export const nameStore = LocalForage.createInstance({ name: "name" });
