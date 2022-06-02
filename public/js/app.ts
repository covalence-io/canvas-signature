(function () {
    const canvas = <HTMLCanvasElement>document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.log('No canvas :(');
        return;
    }

    const mappedEvents: IMappedEvents = {
        start: ['mousedown', 'touchstart'],
        move: ['mousemove', 'touchmove'],
        end: ['mouseup', 'touchend', 'touchcancel'],
    };

    function addEventListeners(element: HTMLElement, event: 'start'|'move'|'end', fn: (ev: Event) => void) {
        const evtArray = mappedEvents[event];

        if (!evtArray) {
            console.log('No events found :(');
            return;
        }

        const len = evtArray.length;

        for (let i = 0; i < len; ++i) {
            element.addEventListener(evtArray[i], fn, false);
        }
    }

    function onSigStart(ev: Event) {
        console.log('Signature starting');
        console.log(ev.type);
    }

    function onSigMove(ev: Event) {
        console.log('Signature moving');
        console.log(ev.type);
    }

    function onSigEnd(ev: Event) {
        console.log('Signature ending');
        console.log(ev.type);
    }

    addEventListeners(canvas, 'start', onSigStart);
    addEventListeners(canvas, 'move', onSigMove);
    addEventListeners(canvas, 'end', onSigEnd);

    ctx.lineWidth = 2;

    // house code
    // ctx.strokeRect(75, 140, 150, 110);
    // ctx.fillRect(130, 190, 40, 60);
    // ctx.beginPath();
    // ctx.moveTo(50, 140);
    // ctx.lineTo(150, 60);
    // ctx.lineTo(250, 140);
    // ctx.closePath();
    // ctx.stroke();
})();

interface IMappedEvents {
    start: string[];
    move: string[];
    end: string[];
}