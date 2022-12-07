import resources from "@/common/enums/resources";
import {
  AuthApiService,
  BuilderApiService,
  ReadOnlyApiService,
  CrudApiService,
} from "@/services/api.service";

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.BUILDER]: new BuilderApiService(resources.BUILDER, notifier),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = store => {
  store.$api.auth.setAuthHeader();
  store.dispatch('Auth/getMe');
};

export const isEmpty = (obj) => {
  for (let key in obj) {
    return false;
  }
  return true;
};
