import time
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)


with open('arq.txt', 'r') as arquivo:
    lista = arquivo.read().split('\n')
    def convert(n):
        return int(n)
    
    num_list = map(convert, lista)
    num_list = list(num_list)

start_time_bubble_sort = time.time()
sorted_list = bubble_sort(num_list)
end_time_bubble_sort = time.time()

start_time_quick_sort = time.time()
sorted_list = quick_sort(num_list)
end_time_quick_sort = time.time()


execution_time_bubble_sort = end_time_bubble_sort - start_time_bubble_sort

execution_time_quick_sort = end_time_quick_sort - start_time_quick_sort

print(f"Bubble-Sort: {execution_time_bubble_sort} segundos")
print(f"Quick_Sort: {execution_time_quick_sort} segundos")