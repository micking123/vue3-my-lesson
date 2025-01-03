import { isObject } from "@vue/shared";

const reactiveMap = new WeakMap();
enum ReactiveFlas {
	IS_REACTIVE = '__v_isReactive'
}
const mutableHandlers: ProxyHandler<any> = {
	get(target, key, receiver) {
		if(key === ReactiveFlas.IS_REACTIVE) {
			return true;
		}
	},
	set(target, key, value, receiver) {
		return true;
	},
};
export function reactive(target) {
	return createReactiveObject(target);
}

function createReactiveObject(target) {
	if (!isObject(target)) {
		return target;
	}
	const existProxy = reactiveMap.get(target);
	if(existProxy) {
		return existProxy;
	}
	if(target[ReactiveFlas.IS_REACTIVE]) {
		return target;
	}
	const proxy = new Proxy(target, mutableHandlers);
	reactiveMap.set(target, proxy);
	return proxy;
}
