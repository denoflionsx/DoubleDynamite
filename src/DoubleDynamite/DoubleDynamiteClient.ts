import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import { EventHandler } from 'modloader64_api/EventHandler';
import { IZ64Main } from 'Z64Lib/API/Common/IZ64Main';
import { IActor, Z64 } from 'Z64Lib/API/imports';
import { ModLoaderAPIInject } from 'modloader64_api/ModLoaderAPIInjector';

export default class DoubleDynamiteClient {

    @ModLoaderAPIInject()
    ModLoader!: IModLoaderAPI;
    @InjectCore()
    core!: IZ64Main;
    phaseSkipped: boolean = false;

    @EventHandler(Z64.Z64Events.ON_ACTOR_SPAWN)
    onAnnoyingBossSpawned(actor: IActor) {
        if (actor.actorID === 0x00DC && !this.phaseSkipped) {
            if (actor.health === 0) {
                actor.health = 0x4;
                this.phaseSkipped = true;
                this.ModLoader.logger.info("Skipping Twinrova phase 1.");
            }
        }
    }

    @EventHandler(Z64.Z64Events.ON_LOADING_ZONE)
    onSceneChanged(evt: any) {
        this.phaseSkipped = false;
    }

}