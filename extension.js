import GObject from 'gi://GObject';
import St from 'gi://St';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as MessageTray from 'resource:///org/gnome/shell/ui/messageTray.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

let globalSettings;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Focus Extension'));

        this.add_child(new St.Icon({
            icon_name: 'face-smile-symbolic',
            style_class: 'system-status-icon',
        }));
        

        let item = new PopupMenu.PopupMenuItem(_('Show Notification'));
        item.connect('activate', () => {
            console.log(globalSettings.get_value('show-indicator').deepUnpack())
            Main.notify(_('Whatʼs up, folks?'), "How are you");
        });
        this.menu.addMenuItem(item);
    }
});

export default class IndicatorExampleExtension extends Extension {
    init(){
        console.log(this._settings)
    }
    enable() {
        this._settings = this.getSettings('org.gnome.shell.extensions.focus');
        globalSettings = this._settings
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}
