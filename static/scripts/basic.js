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
        data = [];
        x = 0;
        y = 0;
        while (!matchColorsAndSelection(data)) {
            response = getNextPixel(ctx, img);
            data = response[0];
            x = response[1];
            y = response[2];
        }
        setPin("./../static/assets/pin.png", getRelativeX(x, img.width, map.width), 
            getRelativeY(y, img.height, map.height));
    };
    img.src = src;
}

function setPin(src,x,y) {
    if (document.getElementById("pin")) {
        document.body.removeChild(document.getElementById("pin"));
    }
    var pin = new Image(43,64);
    pin.src = src;
    pin.id = "pin";
    pin.style.top = y - pin.height;
    pin.style.left = x - (pin.width/2);
    document.body.append(pin);
}

function matchColorsAndSelection(data)
{
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

function getRelativeX(dropZoneX, maskWidth, mapWidth) {
    return dropZoneX * mapWidth / maskWidth
}

function getRelativeY(dropZoneY, maskHeight, mapHeight) {
    return dropZoneY * mapHeight / maskHeight
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