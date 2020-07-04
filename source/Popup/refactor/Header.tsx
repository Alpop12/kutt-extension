import React, {useState} from 'react';
import 'twin.macro';

import Icon from '../../components/Icon';
import messageUtil from '../../util/mesageUtil';
import {openExtOptionsPage} from '../../util/tabs';
import {CHECK_API_KEY} from '../../Background/constants';
import {updateExtensionSettings} from '../../util/settings';
import {
  SuccessfulApiKeyCheckProperties,
  ApiErroredProperties,
  GetUserSettingsBodyProperties,
} from '../../Background';
import {UserConfigProperties, SetPageReloadFlagProperties} from './Popup';

type SetLoadingProperties = React.Dispatch<React.SetStateAction<boolean>>;

type ErrorProperties = {
  error: boolean | null;
  message: string;
};

type SetErroredProperties = React.Dispatch<
  React.SetStateAction<ErrorProperties>
>;

async function fetchUserDomains({
  userConfig: {
    apikey,
    host: {hostUrl},
  },
  setLoading,
  setErrored,
  pageReloadFlag,
  setPageReloadFlag,
}: {
  userConfig: UserConfigProperties;
  setLoading: SetLoadingProperties;
  setErrored: SetErroredProperties;
  pageReloadFlag: boolean;
  setPageReloadFlag: SetPageReloadFlagProperties;
}): Promise<void> {
  // show loading spinner
  setLoading(true);

  const apiKeyValidationBody: GetUserSettingsBodyProperties = {
    apikey,
    hostUrl,
  };
  // request API
  const response:
    | SuccessfulApiKeyCheckProperties
    | ApiErroredProperties = await messageUtil.send(
    CHECK_API_KEY,
    apiKeyValidationBody
  );

  // stop spinner
  setLoading(false);

  if (!response.error) {
    // ---- success ---- //
    setErrored({error: false, message: 'Fetching domains successful'});

    // Store user account information
    const {domains, email} = response.data;
    await updateExtensionSettings({user: {domains, email}});
  } else {
    // ---- errored ---- //
    setErrored({error: true, message: response.message});

    // Delete `user` field from settings
    await updateExtensionSettings({user: null});
  }

  // reload page
  setPageReloadFlag(!pageReloadFlag);

  setTimeout(() => {
    // Reset status
    setErrored({error: null, message: ''});
  }, 1000);
}

type HeaderProperties = {
  userConfig: UserConfigProperties;
  pageReloadFlag: boolean;
  setPageReloadFlag: SetPageReloadFlagProperties;
};

const Header: React.FC<HeaderProperties> = ({
  userConfig,
  pageReloadFlag,
  setPageReloadFlag,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errored, setErrored] = useState<ErrorProperties>({
    error: null,
    message: '',
  });

  return (
    <>
      <header id="header" tw="p-4">
        <div className="logo__holder">
          <img src="assets/logo.png" alt="logo" />
        </div>
        <div className="action__buttons--holder">
          <Icon
            className="icon refresh__icon"
            title="Refresh"
            name={
              // eslint-disable-next-line no-nested-ternary
              loading
                ? 'spinner'
                : errored && errored.error !== null
                ? (errored && !errored.error && 'tick') || 'cross'
                : 'refresh'
            }
            onClick={(): Promise<void> => {
              return fetchUserDomains({
                userConfig,
                setLoading,
                setErrored,
                pageReloadFlag,
                setPageReloadFlag,
              });
            }}
          />
          <Icon
            className="icon settings__icon"
            name="settings"
            title="Settings"
            onClick={openExtOptionsPage}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
