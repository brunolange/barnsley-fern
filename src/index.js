(function(window) {
    let width = 800
    let height = 800

    let x = 0
    let y = 0
    let pointColor = 'white'
    let counter = 0
    let numberParser = (x) => Number(x)
    let options = {
        max: {
            value: 1e5,
            parser: numberParser
        },
        frameRate: {
            value: 20,
            parser: numberParser
        }
    }
    let optionValue = (key) => options[key].value

    let slots = [0.01, 0.85, 0.07]
    function update() {
        let r = random()
        let nextX, nextY
        if (r < slots[0]) {
            nextX = 0
            nextY = 0.16 * y
            pointColor = 'white'
        } else if (r < slots[0] + slots[1]) {
            nextX = 0.85*x + 0.04*y
            nextY = -0.04*x + 0.85*y + 1.60
            pointColor = 'yellow'
        } else if (r < slots[0] + slots[1] + slots[2]) {
            nextX = 0.20*x - 0.26*y
            nextY = 0.23*x + 0.22*y + 1.60
            pointColor = 'green'
        } else {
            nextX = -0.15*x + 0.28*y
            nextY = 0.26*x + 0.24*y + 0.44
            pointColor = 'blue'
        }
        x = nextX
        y = nextY
    }

    function drawPoint() {
        noStroke(pointColor)
        fill(pointColor)
        const px = map(x, -2.1820, 2.6558, 0, width)
        const py = map(y, 0, 9.9983, height, 0)
        ellipse(px, py, 2, 2)
    }

    function setup() {
        createCanvas(width, height)
        background(0)
        setupOptions()
        frameRate(optionValue('frameRate'))
    }

    function setupOptions() {
        urlParams = window.getURLParams()
        for (let key in urlParams) {
            if (options.hasOwnProperty(key)) {
                opt = options[key]
                opt.value = opt.parser(urlParams[key])
            }
        }
    }

    function reportPointCounter() {
        fill(0)
        rect(0, 0, 215 + 10 * Math.floor(Math.log10(counter)), 40)
        fill(255)
        textFont('Fira Code')
        textSize(18)
        text('point counter -> ' + counter, 7, 25)
    }

    function draw() {
        reportPointCounter()

        const batch = random(300, 400)
        for (let i=0; i<batch; i++) {
            if (counter >= optionValue('max')) {
                noLoop()
                reportPointCounter()
                return
            }
            drawPoint()
            update()
            counter++
        }
    }

    window.setup = setup
    window.draw = draw
})(window)
