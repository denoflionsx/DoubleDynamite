import { ProxySide, SidedProxy } from 'modloader64_api/SidedProxy/SidedProxy';
import DoubleDynamiteClient from './DoubleDynamiteClient';

export default class DoubleDynamite{

    @SidedProxy(ProxySide.CLIENT, DoubleDynamiteClient)
    client!: DoubleDynamiteClient;

}