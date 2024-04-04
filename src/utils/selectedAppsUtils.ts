import _ from "lodash";

export type SelectedAppsProps = { id?: string; name?: string; headerImage?: string };

interface GetSelectedApps {
  (): Promise<Array<SelectedAppsProps>>;
}

export const get: GetSelectedApps = async () => {
  const data = localStorage.getItem("selected_apps");
  if (data) {
    const arrayData: unknown = Array.from(JSON.parse(data));
    return arrayData as Array<SelectedAppsProps>;
  }
  localStorage.setItem("selected_apps", JSON.stringify([]));
  return [] as Array<SelectedAppsProps>;
};

export const getOne = async (id: string) => {
  const selectedApps = await get();
  const app = selectedApps.find((e) => e.id === id);
  return app;
};

export const getByName = async (name: string) => {
  const selectedApps = await get();
  if (name === "") {
    return selectedApps;
  }
  const app = selectedApps.filter((e) => {
    const lowerNameQuery = name.toLowerCase();
    const lowerNameApp = e.name?.toLowerCase();
    return lowerNameApp?.includes(lowerNameQuery);
  });
  return app;
};

export const isExists = async (id: string) => {
  const prevData = await get();
  const isExist = prevData.find((e) => e.id === id);
  return isExist;
};

export const add = async (data: SelectedAppsProps) => {
  const prevValue = await get();
  prevValue.push(data);
  const dropDuplicate = _.uniqBy(prevValue, (e) => e.id);
  localStorage.setItem("selected_apps", JSON.stringify(dropDuplicate));
};

export const remove = async (id: string) => {
  const prevValue = await get();
  const filteredApps = prevValue.filter((app) => app.id !== id);
  localStorage.setItem("selected_apps", JSON.stringify(filteredApps));
};

export const removeAll = async () => {
  localStorage.removeItem("selected_apps");
};
