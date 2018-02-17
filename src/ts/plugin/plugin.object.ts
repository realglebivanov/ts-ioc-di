import { PluginObject as Plugin, VueConstructor } from 'vue';
import { PluginOptions } from './plugin.options';

import { Injector } from '@/injector';

export class PluginObject implements Plugin<PluginOptions> {
    public install(vue: VueConstructor, options?: PluginOptions): void {
        vue.mixin({
            created: function () {
                // new Injector(this).injectAll();
            }
        });
    }
}
