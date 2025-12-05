(function() {
    window.env = window.env || {};
    
    const defaults = {
        WEBSOCKET_URL: 'ws://localhost:1234',
        API_BASE_URL: 'http://localhost:4000',
        COMPLETION_API_URL: 'http://localhost:4000/api/complete'
    };
    
    Object.keys(defaults).forEach(key => {
        window.env[key] = defaults[key];
    });
})();