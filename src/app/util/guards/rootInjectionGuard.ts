import { inject, InjectOptions, Type } from "@angular/core";

export class RootInjectorGuard {
    option: InjectOptions = {
        skipSelf: true,
        optional: true
    }

    constructor(type: Type<any>) {
        const parent = inject(type, this.option)
        if (parent) {
            throw Error(`[${type.name}]: Can not create more than one instance`)
        }
    }
}