class Node: 
    def __init__(self, value):
        self.value = value
        self.prox = None


class List: 
    def __init__(self):
        self.source = None

    def add(self, value):
        if not self.source:
            self.source = Node(value)
        else: 
            self.__add(value, self.source)

    def _add(self, value, position):
        new_node = Node(value)

        if position == 0:
            new_node.prox = self.source
            self.source = new_node
            return

        atual = self.source
        for _ in range(position - 1):
            if atual.prox is None:
                break
            atual = atual.prox

        new_node.prox = atual.prox
        atual.prox = new_node

    def __add(self, value, node):
        if not node.prox: 
            node.prox = Node(value)
        else:
            self.__add(value, node.prox)

    def remove(self, value):
        if self.source.value == value:
            self.source = None
        elif self.source.prox.value == value:
            self.source.prox = None
        else: 
            self._remove(self.source, value)

    def _remove(self, node, value): 
        prox = node.prox
        if prox.value == value and prox.prox:
            node.prox = prox.prox
        elif prox.value == value and ( not prox.prox ):
            node.prox = None
        else: 
            self._remove(node.prox, value)

    def imprime(self): 
        print(self.source.value)
        if self.source.prox:
            self._imprime(self.source.prox)

    def _imprime(self, node):
        print(node.value)
        if node.prox:
            self._imprime(node.prox)


with open('./atividade 1/arq.txt', 'r') as arquivo:
    lista = List()

    numeros = list(map(int, arquivo.readline().strip().split()))

    for i in range(len(numeros)):
        lista.add(numeros[i])
    
    for linha in arquivo:
        partes = linha.strip().split()
        
        if partes[0] == 'A':
            valor = int(partes[1])
            quantidade = int(partes[2])
            lista._add(valor, quantidade)
        
        elif partes[0] == 'R':
            valor = int(partes[1])
            lista.remove(valor)
        
        elif partes[0] == 'P':
            lista.imprime()
        