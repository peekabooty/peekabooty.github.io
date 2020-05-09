function newPoint(src) {
    var map = document.getElementById("map");
    var img = new Image();
    img.onload = function () {
        img.style.display = 'none';
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        do {
            response = getNextPixel(ctx, img);
            data = response[0];
            x = response[1];
            y = response[2];
        } while (!matchColorsAndSelection(data))
        var borderMargin = parseInt(getComputedStyle(map).getPropertyValue('border-left-width').slice(0, 2))
        var mapOriginX = map.getBoundingClientRect().left + borderMargin
        var mapOriginY = map.getBoundingClientRect().top + borderMargin
        setPin(
            "./../static/assets/pin.png",
            getRelativeX(x, img.width, mapOriginX, map.width),
            getRelativeY(y, img.height, mapOriginY, map.height));
    };
    img.src = src;
}

function setPin(src, x, y) {
    if (document.getElementById("pin")) {
        document.body.removeChild(document.getElementById("pin"));
    }
    var pin = new Image(43, 64);
    pin.src = src;
    pin.id = "pin";
    pin.style.top = y - pin.height;
    pin.style.left = x - (pin.width / 2);
    document.body.append(pin);
}

function matchColorsAndSelection(data) {
    var hotDropStatus = document.getElementById("hot_drop").checked;
    var avgDropStatus = document.getElementById("avg_drop").checked;
    var safeDropStatus = document.getElementById("safe_drop").checked;
    var safestDropStatus = document.getElementById("safest_drop").checked;

    return data && (hotDropStatus && isRed(data) || avgDropStatus && isBlue(data) ||
        safeDropStatus && isGreen(data) || safestDropStatus && isBlack(data));
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

function isBlack(data) {
    return !data[0] && !data[1] && !data[2]
}

function getNextPixel(ctx, img) {
    x = getRandomInt(0, img.width);
    y = getRandomInt(0, (img.height * IMAGE_RATIO));
    var data = ctx.getImageData(x, y, 1, 1).data;
    return [data, x, y]
}

function getRelativeX(dropZoneX, maskWidth, mapOriginX, mapWidth) {
    var relativeX = dropZoneX * mapWidth / maskWidth
    console.log(`original mask point: ${dropZoneX}`)
    console.log(`original mask width: ${maskWidth}`)
    console.log(`map x origin: ${mapOriginX}`)
    console.log(`map width: ${mapWidth}`)
    relativeX += mapOriginX
    console.log(`final relative x: ${relativeX}`)
    return relativeX
}

function getRelativeY(dropZoneY, maskHeight, mapOriginY, mapHeight) {
    var relativeY = dropZoneY * mapHeight / maskHeight
    console.log(`original mask point: ${dropZoneY}`)
    console.log(`original mask width: ${maskHeight}`)
    console.log(`map y origin: ${mapOriginY}`)
    console.log(`map width: ${mapHeight}`)
    relativeY += mapOriginY
    console.log(`final relative y: ${relativeY}`)
    return relativeY
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function changeDropZoneStatus() {
    if (document.getElementById('hot_zone_picker').style.display == "none") {
        document.getElementById('hot_zone_picker').style.display = "block";
    } else {
        if (document.getElementById('hot_zone_picker').style.display == "") {
            document.getElementById('hot_zone_picker').style.display = "block";
        } else {
            document.getElementById('hot_zone_picker').style.display = "none";
        }
    }
}

function zoomImage() {
    if (isZoomedIn()) {
        zoomOutImage()
    } else {
        zoomInImage()
    }
}

function isZoomedIn() {
    var mapContainer = document.getElementById('map-container')
    var width = mapContainer.style.width;
    var height = mapContainer.style.height;
    return width == 'auto' && height == 'auto'
}

function zoomOutImage() {
    var mapContainer = document.getElementById('map-container')
    mapContainer.style.width = '100%'
    mapContainer.style.height = '100%'
}

function zoomInImage() {
    var mapContainer = document.getElementById('map-container')
    mapContainer.style.width = 'auto'
    mapContainer.style.height = 'auto'
}