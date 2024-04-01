type Apps = { selectedApps: string[]; appId: string };
interface Check {
  (appParams: Apps): boolean;
}

const check: Check = ({ selectedApps, appId }) => {
  return selectedApps && selectedApps.find((e) => e == appId) !== undefined;
};

const selectedAppsUtils = {
  check,
};

export default selectedAppsUtils;
