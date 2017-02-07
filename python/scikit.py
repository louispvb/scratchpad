from sklearn import datasets
from sklearn import svm

iris = datasets.load_iris()
digits = datasets.load_digits()

clf = svm.SVC(gamma=0.001, C=100.)
clf.fit(digits.data[:-1], digits.target[:-1])
print(digits.images[0:][0])
print(clf.predict(digits.data[0:][0]))
# print(digits.da
