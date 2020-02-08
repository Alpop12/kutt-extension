import React from 'react';

import { ProcessRequestProperties } from './Popup';

export type ProcessedRequestProperties = {
    error: boolean | null;
    message: string;
};

type PopupBodyProperties = {
    requestProcessed: ProcessedRequestProperties;
    setRequestProcessed: ProcessRequestProperties;
};

const PopupBody: React.FC<PopupBodyProperties> = ({ requestProcessed: { message, error }, setRequestProcessed }) => {
    return (
        <>
            <div>
                {!error ? (
                    <button
                        type="button"
                        onClick={(): void => {
                            return setRequestProcessed({ error: null, message: '' });
                        }}
                    >
                        Go Back
                    </button>
                ) : null}
                <p>{message}</p>
            </div>
        </>
    );
};

export default PopupBody;
