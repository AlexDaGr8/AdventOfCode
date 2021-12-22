print('hello')
path = './input.txt'
input_file = open(path, 'r')
input = input_file.read().split('\n')
for i in range(0, len(input)):
    input[i] = int(input[i])
input.append(0)
input.append(max(input) + 3)
input.sort()
print(input)
class data:
    listId = 0
def get_unique(list, num, data): 
    nextNums = filter(lambda x: x > num and x <= (num + 3), list)
    if len(nextNums) > 0:
        for nn in nextNums:
            get_unique(list, nn, data)
    else:
        data.listId += 1
    # let nextNums = list.filter(d => d > nextNum && d <= nextNum + 3);
    #         if (nextNums.length > 0) {
    #             for (let nn of nextNums) {
    #                 getUnique(list, nn, data)
    #             }
    #         } else {
    #             // data.list.push([]);
    #             data.listID++;
    #         }


get_unique(input, 0, data)
print(data.listId)