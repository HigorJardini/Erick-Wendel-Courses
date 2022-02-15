
export default class Formation {

    static timeOut(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}