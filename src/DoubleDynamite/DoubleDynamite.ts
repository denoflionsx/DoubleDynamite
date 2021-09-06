import { IPlugin, IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { IOOTCore, OotEvents } from 'modloader64_api/OOT/OOTAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { EventHandler } from 'modloader64_api/EventHandler';
import { IActor } from 'modloader64_api/OOT/IActor';

class DoubleDynamite implements IPlugin {

    ModLoader!: IModLoaderAPI;
    pluginName?: string | undefined;
    @InjectCore()
    core!: IOOTCore;
    phaseSkipped: boolean = false;

    preinit(): void {
    }
    init(): void {
    }
    postinit(): void {
    }
    onTick(frame?: number | undefined): void {
    }

    @EventHandler(OotEvents.ON_ACTOR_SPAWN)
    onAnnoyingBossSpawned(actor: IActor) {
        if (actor.actorID === 0x00DC && !this.phaseSkipped) {
            if (actor.health === 0) {
                actor.health = 0x4;
                this.phaseSkipped = true;
                this.ModLoader.logger.info("Skipping Twinrova phase 1.");
            }
        }
    }

    @EventHandler(OotEvents.ON_LOADING_ZONE)
    onSceneChanged(evt: any) {
        this.phaseSkipped = false;
    }

}

module.exports = DoubleDynamite;