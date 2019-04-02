let app = {
    settings: {
        nocache: 0,
        debug_translations: 0
    },
    init: function(url) {
        this.url = url;

        for (key in this.settings) {
            this.settings[key] = this.get('pimcore_' + key) ? 1 : 0;
            document.querySelector('input[name="pimcore_' + key + '"]').checked = this.settings[key];
        }

        document.querySelector('#js-app-apply').addEventListener('click', this.apply.bind(this), false);
    },
    apply: function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, { url : this.url });
        });
    },
    get: function(key) {
        let result = null,
        url = this.url.split('?');
        tmp = [];
        url[1]
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === key) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
}

chrome.tabs.query({active: true, currentWindow: true, lastFocusedWindow: true }, function(tabs) {
    app.init(tabs[0].url).bind(app);
});