(function () {
    const canvas = <HTMLCanvasElement>document.querySelector('canvas');
    const btn = <HTMLButtonElement>document.querySelector('button');
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
    let drawing = false;

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
        // console.log('Signature starting');
        // console.log(ev.type);
        const coords = getOffset(ev);

        if (!coords) {
            return;
        }

        ctx?.beginPath();
        ctx?.moveTo(coords.x, coords.y);
        drawing = true;
    }

    function onSigMove(ev: Event) {
        // console.log('Signature moving');
        // console.log(ev.type);
        if (!drawing) {
            return;
        }

        const coords = getOffset(ev);

        if (!coords) {
            return;
        }

        ctx?.lineTo(coords.x, coords.y);
        ctx?.stroke();
    }

    function onSigEnd(ev: Event) {
        // console.log('Signature ending');
        // console.log(ev.type);
        drawing = false;
    }

    function sigClear() {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }

    function getOffset(ev: Event) {
        const mEvent = <MouseEvent>ev;
        let x = 0;
        let y = 0;

        if (!mEvent.offsetX || !mEvent.offsetY) {
            const tEvent = <TouchEvent>ev;
            const touches = tEvent.touches;

            if (touches.length > 1) {
                return;
            }

            const touch = touches[0];
            const rect = (<HTMLElement>ev.currentTarget).getBoundingClientRect();
            x = touch.pageX - rect.x;
            y = touch.pageY - rect.y;
        } else {
            x = mEvent.offsetX;
            y = mEvent.offsetY;
        }

        return {
            x: x / canvas.offsetWidth * canvas.width,
            y: y / canvas.offsetHeight * canvas.height,
        };
    }

    addEventListeners(canvas, 'start', onSigStart);
    addEventListeners(canvas, 'move', onSigMove);
    addEventListeners(canvas, 'end', onSigEnd);

    if (!!btn) {
        btn.addEventListener('click', sigClear, false);
    }

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