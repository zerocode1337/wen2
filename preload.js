console.log('preload.js is running...');
if (window.require) {
    window.requireNode = window.require;
    window.moduleNode  = window.module;

    window.require = undefined;
    window.module  = undefined;
}
