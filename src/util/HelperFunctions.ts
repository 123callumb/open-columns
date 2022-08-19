export function OnDomReady(callback: () => void){
    document.readyState !== 'loading' ? callback() : document.addEventListener('DOMContentLoaded', callback);
}

export function Throw(mesage: string) {
    throw "========================\nOPEN COLUMNS: " + mesage + "\n============================";
}