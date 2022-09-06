export function OnDomReady(callback: () => void){
    document.readyState !== 'loading' ? callback() : document.addEventListener('DOMContentLoaded', callback);
}

export function Throw(message: string) {
    throw "========================\nOPEN COLUMNS ERROR: " + message + "\n============================";
}

export function Warn(message: string){
    console.warn("========================\nOPEN COLUMNS WARNING: " + message + "\n============================")
}

export function NameOf<T>(f: keyof T){
    return f;
}