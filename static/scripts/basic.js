function setPin(x,y) {
    var pin = new Image(43,64);
    pin.src = "./../assets/pin.png";
    pin.id = "pin";
    pin.style.top = y;
    pin.style.left = x;
    document.body.append(pin);
}

function matchColorsAndSelection(data)
{
    var hotDropStatus = document.getElementById("hot_drop").checked;
    var avgDropStatus = document.getElementById("avg_drop").checked;
    var safeDropStatus = document.getElementById("safe_drop").checked;
    var safestDropStatus = document.getElementById("safest_drop").checked;

    return data && (hotDropStatus && isRed(data) || avgDropStatus && isBlue(data) || 
        safeDropStatus && isGreen(data) || safestDropStatus);
}

function isRed(data) {
    return data[0] && !data[1] && !data[2]
}

function isGreen(data) {
    return !data[0] && data[1] && !data[2]
}

function isBlue(data) {
    return !data[0] && !data[1] && data[2]
}

function getNextPixel(ctx, img) {
    x = getRandomInt(0, img.width);
    y = getRandomInt(0, (img.height * IMAGE_RATIO));
    var data = ctx.getImageData(x, y, 1, 1).data;
    return [data, x, y]
}

function getRelativeX(dropZoneX, maskWidth, mapWidth) {
    return dropZoneX * mapWidth / maskWidth
}

function getRelativeY(dropZoneY, maskHeight, mapHeight) {
    return dropZoneY * mapHeight / maskHeight
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function changeDropZoneStatus() {
    if (document.getElementById('hot_zone_picker').style.display == "none") {
        document.getElementById('hot_zone_picker').style.display = "block";
    } else {
        document.getElementById('hot_zone_picker').style.display = "none";
    }
}