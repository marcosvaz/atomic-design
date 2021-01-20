## Instalação e rodando o projeto
Para rodar o projeto, será necessário possuir o [Yarn](https://classic.yarnpkg.com/en/docs/install/) instalado.

Clone ou baixe o .zip do projeto, acesse a pasta e rode o comando ```yarn```, isso fará com que os pacotes necessários para rodar o projeto sejam instalados.

Após a instalação, para rodar o projeto, rode o comando ```yarn start```.

## Arquitetura
O projeto está baseado na arquitetura Atomic Design, que é baseado na estrutura atômica para organização de seus componentes, sendo assim, organizado da seguinte maneira (da menor para a maior estrutura, respectivamente): átomos - moléculas - organismos - templates - páginas.

![Atomic ](https://s3.amazonaws.com/ckl-website-static/wp-content/uploads/2019/12/blogpost-atomic-react-02.png)

> Para maiores referências: [UX Collective](https://brasil.uxdesign.cc/atomic-design-redesenhando-os-entreg%C3%A1veis-de-designers-e-desenvolvedores-da8886c7258d)

#### Vamos tomar os seguintes exemplos:

Pode-se dizer que um botão é um dos menores componentes que você terá no seu projeto, e um dos mais reutilizados, ou seja, o melhor a se fazer, é componentizar ele da forma mais genérica o possível e que supra a necessidade do projeto a ser desenvolvido.

Basicamente ele se parece assim:

![Atom](https://i.ibb.co/QcM7pKh/atom.png)

E sua estrutura em código seria:
```tsx
export const Button = ({
  children = "Label",
  onClick = () => void,
  ...rest
}) => {
  return (
    <Container onClick={onClick} {...rest}>
      {children}
    </Container>
  )
}
```

Em seguida, temos um item de uma lista, que esse por sua vez, renderiza um texto como um label, e um botão, que no caso, podemos dizer que seriam dois ```átomos```, e assim sendo, a soma de um ou mais ```átomos```, forma uma ```molécula```:

![Molecule](https://i.ibb.co/wc4vGFn/molecule.png)

Com sua estrutura:
```tsx
export const ListItem = ({
  title="Label",
  button={
    onClick: () => void,
    text: "Label"
  }
}) => {
  return (
    <Container>
      <Text>{title}</Text>
      <Button onClick={button.onClick}>{button.text}</Button>
    </Container>
  )
}
```

Em seguida temos uma lista que renderiza esses itens, no caso, a soma de diversas ```moléculas``` resulta em um ```organismo```, pode-se parecer que temos apenas uma ```molécula```, mas isso vai depender de quantos itens iremos renderizar, ou seja, se renderizarmos 2 ou mais, já acaba sendo um ```organismo``` de certa forma, e podemos levar em conta também que, criando esse ```organismo```, vamos conseguir reutilizar o map, e não será preciso realizar novamente a função, em outro componente, para criar uma lista de itens:

![Organism](https://i.ibb.co/StPkNDf/organism.png)

Por sua vez, o componente recebe os itens a serem renderizados para criar a lista:
```tsx
export const List = ({
  items
}) => {
  return (
    items.map(item => 
      <ListItem 
        key={item.id} 
        title={item.title} 
        button={item.button}
      />
    )
  )
}
```

Em conseguinte, temos um ```template``` de Dashboard, que vai ser a base de uma ```página```, em que aqui, vamos renderizar um Header no topo, uma Sidebar na lateral esquerda, e o conteúdo da ```página```:

![Template](https://i.ibb.co/n37RK9r/template.png)

Temos o seguinte código de exemplo:
```tsx
export const DashboardTemplate = ({ 
  page, 
  children
}) => {
  return (
    <Container>
      <Header />
      <Sidebar active={page} />
      <Content>
      	{ children }
      </Content>
    </Container>
  )
}
```

E por último, temos a renderização efetiva da ```página```, onde ficará realmente toda a parte de chamada das ```API's``` e a parte de lógica da ```página```, que será passado aos componentes que serão renderizados, como o ```template``` e o ```organismo``` que renderizaremos dentro da ```página``` a seguir:

![Page](https://i.ibb.co/m9fNyHn/page.png)

Então o código da página seria basicamente a lógica e a renderização dos componentes específicos para aquela página, sendo da seguinte forma:
```tsx
export const Dashboard = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ items, setItems ] = useState([])

  const listItemsService = async () => {
    setIsLoading(true);
    try {
      const response = await getItemsFromService();
      setItems(response);
    } catch (e) {
      // sua mensagem de erro
      throw Error(`Erro no retorno do serviço getItemsFromService [${e}]`)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listItemsService();
  }, [])
  
  return (
    <DashboardTemplate page={'Dashboard'}>
      <Loading loading={isLoading}>
        <List items={items} />
      </Loading>
    </DashboardTemplate>
  )
}
```

## Documentação
Para documentar o projeto, está sendo utilizado o [Storybook](https://storybook.js.org/), onde, ao criar cada componente utilizando-se do [Scaffdog](https://github.com/cats-oss/scaffdog), é gerado um arquivo ```[nome-do-componente].stories.tsx``` que é a documentação referente ao mesmo.

Vamos seguir um exemplo desse projeto:

Ao criar um componente, utilize o [Scaffdog](https://github.com/cats-oss/scaffdog) com o comando ```yarn g```:
![Scaffdog - estrutura](https://i.ibb.co/fvTFS7X/estructure.png)
![Scaffdog - Destino](https://i.ibb.co/9NnfM4f/destination.png)
![Scaffdog - Nomeando](https://i.ibb.co/bb6WVRQ/naming.png)
Selecionando um tipo de componente para criar, como um átomo chamado ```Button```, por exemplo, veremos que ele irá criar uma pasta com o nome do componente e 3 arquivos dentro da mesma, sendo os seguintes: ```index.tsx```, ```styles.ts``` e o ```Button.stories.tsx```.

O arquivo ```Button.stories.tsx``` vai possuir o seguinte conteúdo:
```tsx
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Button, IButtonProps } from '.'

export default {
  title: 'Atoms/Button',
  component: Button,
} as Meta

const Template: Story<IButtonProps> = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {}
```

Com isso podemos ver que as propriedades do componente são definidas pelo ```IButtonProps``` que vem do arquivo ```index.tsx```, ou seja, ao definirmos lá, essas propriedades serão importadas para cá, e o próprio componente também, e esse arquivo cria a documentação que pode ser acessada com o comando ```yarn storybook``` e acessando a url [http://localhost:6006](http://localhost:6006).

![](https://i.ibb.co/qrKQqMp/Captura-de-Tela-2021-01-19-a-s-22-02-10.png)

Ao definir as propriedades, no componente, em ```IButtonProps``` através do [Typescript](https://www.typescriptlang.org/), essas propriedades são mostradas na documentação para que você possa testar variações das mesmas, como por exemplo, se definirmos que nosso botão vai ter a propriedade ```children``` e ela será uma ```string```, e uma propriedade ```onClick``` que será uma função sem retorno (```() => void```):
```tsx
[...]

// interface do Typescript com a propriedade 'children' definida como uma 'string'
// e com a propriedade 'onClick' definida como uma função sem retorno '() => void'
export interface IButtonProps {
  children: string
  onClick: () => void
}

export const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  ...rest,
}): JSX.Element => {
  return (
    <Container onClick={onClick} {...rest}>
      {children}
    </Container>
  )
}
```
> Utilizaremos o [Typescript](https://www.typescriptlang.org/) para realizar essa definição de tipos para as propriedades, como por exemplo, uma propriedade ser uma ```string```, um ```boolean```, um ```number```, uma função sem retorno ```() => void```, ou outros tipos do [Typescript](https://www.typescriptlang.org/).
>
> Para uma maior referência sobre os tipos básicos do Typescript, [clique aqui](https://www.typescriptlang.org/docs/handbook/basic-types.html).

E definirmos no ```Button.stories.tsx``` os argumentos padrão:

```tsx
[...]

const Template: Story<IButtonProps> = args => <Button {...args} />

// Definição dos argumentos padrão para a documentação
export const Default = Template.bind({})
Default.args = {
  children: 'Entrar', // Aqui poderá ser qualquer valor no lugar de 'Entrar', o componente será criado apenas para documentação
  onClick: () => alert('Botão entrar') // Aqui você pode utilizar qualquer função, o componente será criado apenas para documentação
}
```

E para criar uma variante desse componente, na documentação do [Storybook](https://storybook.js.org/), você deve apenas adicionar um item, semelhante ao ```Default```, para cada uma das variações que desejar documentar:

```tsx
[...]

export const Default = Template.bind({})
Default.args = {
  children: 'Padrão',
  onClick: () => alert('Botão padrão')
}

export const Variante1 = Template.bind({})
Variante2.args = {
  children: 'Variante 1',
  onClick: () => alert('Botão Variante 1')
}

export const Variante2 = Template.bind({})
Variante2.args = {
  children: 'Variante 2',
  onClick: () => alert('Botão Variante 2')
}

[...]
```
