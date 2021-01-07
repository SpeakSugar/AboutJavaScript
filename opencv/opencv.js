const cv = require('opencv4nodejs')
const image = cv.imread('mThorTaTestImage1.jpg')
const cvtGImage = image.cvtColor(cv.COLOR_BGR2GRAY)
cv.imwrite('去色.jpg', cvtGImage)
const thresholdImage = cvtGImage.adaptiveThreshold(255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2)
cv.imwrite('自适应阈值.jpg', thresholdImage)