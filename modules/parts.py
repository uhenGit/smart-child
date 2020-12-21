import json
import random

def randWord(lang):
    with open('./static/dict.json', 'r') as d:
        word = json.load(d)
        rand_num = random.randint(0, len(word[lang])-1)
    for el in word:
        if el != lang:
            fi_word_list = word[lang]
            se_word_list = word[el]
            return(fi_word_list[rand_num], se_word_list[rand_num])

def additionalElement(uniq_elements):
    additional_index = random.randint(0, len(uniq_elements)-1)
    uniq_elements.insert(random.randint(0, len(uniq_elements)), uniq_elements[additional_index])
    return uniq_elements

def setRandArr(num):
    rand_arr = []
    quantity = 7
    while len(rand_arr) < quantity:
        rand_num = random.randint(0, num-1)
        if rand_arr.count(rand_num) == 0:
            rand_arr.append(rand_num)
    array = additionalElement(rand_arr)
    array = [str(i) for i in array]
    return array