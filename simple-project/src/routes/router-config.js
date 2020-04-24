import {UIRouterReact, servicesPlugin, hashLocationPlugin} from "@uirouter/react";
import appStates from "./states";

// Create a new instance of the Router
export const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);

// Register states
appStates.forEach(state => router.stateRegistry.register(state));

// Global config for router
router.urlService.rules.initial({ state: 'home' });

/* import reqAuthHook from '../services/requiresAuth';
router.transitionService.onBefore(reqAuthHook.criteria, reqAuthHook.callback, {priority: 10});
 */