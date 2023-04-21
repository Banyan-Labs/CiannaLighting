export const buildObjectFromFormControls = (
    refNodeList: HTMLFormControlsCollection
): { [key: string]: string | number } => {
    const formValues: { [key: string]: string | number } = {};
    for (const element of Object.values(refNodeList)) {
        const controlElement = element as HTMLFormElement;
        if (
            controlElement.tagName !== 'BUTTON' &&
            controlElement.name &&
            controlElement.value
        ) {
            formValues[controlElement.name] = controlElement.value;
        }
    }

    return formValues;
};
