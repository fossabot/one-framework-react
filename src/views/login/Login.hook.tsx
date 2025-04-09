import { useEffect, useState } from 'react';
import { AppRouterName } from '../../AppRouter';
import { LoginState } from './Login.state';
import InputFormHook from '../../common/hooks/formHook';

/** For login view action */
function LoginHook() {
    const [componentState, setcomponentState] = useState(new LoginState());
    const inputFormHook = InputFormHook(componentState, setcomponentState);

    /**
     * Login action
     */
    async function login(): Promise<void> {
        const pageState: LoginState = componentState.copy();
        const loginStatus = await pageState.login();
        if (loginStatus) {
            window.location.href = AppRouterName.home;
        }
        else {
            setcomponentState(pageState);
        }
    }

    /**
     * Load page
     */
    async function loadPage(): Promise<void> {
        const pageState: LoginState = componentState.copy();
        await pageState.init();
        setcomponentState(pageState);
    }

    useEffect(() => {
        // userEffect implement here
        loadPage();
    }, []);
    return {
        componentState,
        login,
        handleFormInputChanged : inputFormHook.handleFormInputChanged,
    };
}

export default LoginHook;