import GObject from 'gi://GObject';
import St from 'gi://St';
import GLib from 'gi://GLib';

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
        const work_path = "dialog-information"
        const pro_path = "edit-undo"
        const break_path = "view-refresh"

        const work_icon = new St.Icon({
            icon_name:work_path,
            style_class:"work_icon"
        })

        const pro_icon = new St.Icon({
            icon_name:pro_path,
            style_class:"pro_icon"
        })

        const break_icon = new St.Icon({
            icon_name:break_path,
            style_class:"break_icon"
        })

        let current_icon;
        const current_status = globalSettings.get_string('current-status')
        if (current_status == 'break'){
            current_icon = break_icon
        } else if (current_status == 'procrastinate') {
            current_icon = pro_icon
        } else {
            current_icon = break_icon
        }
                
        this.add_child(current_icon)
        // this.add_child(new St.Icon({
        //     icon_name: 'face-smile-symbolic',
        //     style_class: 'system-status-icon',
        //     // icon_path: '/path/to/your/custom-icon.svg', // Specify the path to your custom icon
        // }));
        

        // let item = new PopupMenu.PopupMenuItem(_('Show Notification'));
        // item.connect('activate', () => {
        //     console.log(globalSettings.get_string('current-status'))
        //     console.log(globalSettings.get_value('show-indicator').deepUnpack())
        //     Main.notify(_('Whatʼs up, folks?'), "How are you");
        // });
        // this.menu.addMenuItem(item);


        let item1 = new PopupMenu.PopupMenuItem(_('Work'));
        let item2 = new PopupMenu.PopupMenuItem(_('Procrastinate'));
        let item3 = new PopupMenu.PopupMenuItem(_('Break'));

        item1.connect('activate', () => {
            console.log("Hellooooo");
            // Here aliases wont work( aliases as in created using bashrc but you can have .sh files)
            GLib.spawn_command_line_async("notify-send 'Hello, World!' 'This is a simple notification.'");
        });
        this.menu.addMenuItem(item1);
        this.menu.addMenuItem(item2)
        this.menu.addMenuItem(item3)

    }
});

export default class IndicatorExampleExtension extends Extension {
    init(){
        console.log(this._settings)
    }
    enable() {
        this._settings = this.getSettings('org.gnome.shell.extensions.focus');
        globalSettings = this._settings
        this._indicator = new Indicator(this);
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}
