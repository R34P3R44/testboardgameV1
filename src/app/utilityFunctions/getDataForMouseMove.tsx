
export const getDataForMouseMove = (event: React.MouseEvent, firstChild: HTMLElement) => {

    const rect = firstChild.getBoundingClientRect();

    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const startX = window.innerWidth - rect.width
    const startY = window.innerHeight - rect.height


    let moveData = {
        offsetX: offsetX,
        offsetY: offsetY,
        startTestX: startX,
        startTestY: startY
    }

    return moveData
}