def series(n):
    for i in range(1, n+1):
        yield 1.0 / (1+(i-1)*3)

def series_sum(n):
    return "{0:.2f}".format(sum(series(n)))

def add_binary(a,b):
    return bin(a+b)[2:]

def sum_array(arr):
    return sum(sorted(arr)[1:len(arr)-1]) if arr is not None else 0

def square_digits(num):
    res = ""
    for c in str(num):
        res += str(int(c)**2)
    return int(res)

def persistence(n):
    num = n
    counter = 0
    while len(str(num)) > 1:
        numstr = str(num)
        counter += 1
        num = reduce(lambda x, acc: x * acc, map(int, list(numstr)))
    return counter

def get_sum(a,b):
    if a == b:
        return a
    elif b > a:
        return sum(range(a, b + 1))
    else:
        return sum(range(b, a + 1))

def duplicate_count(text):
    counts = {}
    for c in text:
        counts[c.lower()] = counts.get(c.lower(), 0) + 1
    return len({k: v for k, v in counts.items() if v > 1})

def array_diff(a, b):
    return [x for x in a if x not in b]

def repeat_str(repeat, string):
    return ''.join(map(lambda x: string, range(repeat))) # string * repeat -_-

def digitize(n):
    return list(reversed(map(int, str(n))))

def high_and_low(numbers):
    asc = list(map(str, sorted(map(int, numbers.split(' ')))))
    return str(asc[-1]) + ' ' + str(asc[0])

def accum(s):
    res = []
    for i,v in enumerate(s):
        res.append(v.upper()+v.lower()*i)
    return '-'.join(res)

def compose(f, g):
    return lambda x: g(f(x))

def chained(functions):
    return reduce(compose, functions)
