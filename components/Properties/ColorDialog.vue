<template>
  <VDialog
    width="1010px"
    :transition="false"
    :value="isOpen"
    @input="$emit('update:is-open', $event)"
  >
    <VCard>
      <VForm ref="form" @submit.prevent="onSubmit">
        <VCardTitle>
          <h2 class="text-h2">Select a color</h2>
        </VCardTitle>
        <VCardText>
          <div class="mb-4">
            <VBtn @click="onColor(undefined)">none</VBtn>
            <VBtn color="primary" @click="onColor('primary')">primary</VBtn>
            <VBtn color="secondary" @click="onColor('secondary')">secondary</VBtn>
            <VBtn color="success" class="ml-4" @click="onColor('success')">success</VBtn>
            <VBtn color="info" @click="onColor('info')">info</VBtn>
            <VBtn color="warning" dark @click="onColor('warning')">warning</VBtn>
            <VBtn color="error" dark @click="onColor('error')">error</VBtn>
            <VBtn color="black" class="ml-4" dark @click="onColor('black')">black</VBtn>
            <VBtn color="white" @click="onColor('white')">white</VBtn>
            <VBtn class="ml-4" @click="onColor('transparent')">transparent</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="red lighten-5" @click="onColor('red lighten-5')">-5</VBtn>
            <VBtn small color="red lighten-4" @click="onColor('red lighten-4')">-4</VBtn>
            <VBtn small color="red lighten-3" @click="onColor('red lighten-3')">-3</VBtn>
            <VBtn small color="red lighten-2" @click="onColor('red lighten-2')">-2</VBtn>
            <VBtn small color="red lighten-1" @click="onColor('red lighten-1')">-1</VBtn>
            <VBtn small color="red" width="100px" class="mx-4" @click="onColor('red')">red</VBtn>
            <VBtn small color="red darken-1" dark @click="onColor('red darken-1')">+1</VBtn>
            <VBtn small color="red darken-2" dark @click="onColor('red darken-2')">+2</VBtn>
            <VBtn small color="red darken-3" dark @click="onColor('red darken-3')">+3</VBtn>
            <VBtn small color="red darken-4" dark @click="onColor('red darken-4')">+4</VBtn>
            <VBtn small color="red accent-1" class="ml-4" @click="onColor('red accent-1')">a1</VBtn>
            <VBtn small color="red accent-2" @click="onColor('red accent-2')">a2</VBtn>
            <VBtn small color="red accent-3" @click="onColor('red accent-3')">a3</VBtn>
            <VBtn small color="red accent-4" @click="onColor('red accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="pink lighten-5" @click="onColor('pink lighten-5')">-5</VBtn>
            <VBtn small color="pink lighten-4" @click="onColor('pink lighten-4')">-4</VBtn>
            <VBtn small color="pink lighten-3" @click="onColor('pink lighten-3')">-3</VBtn>
            <VBtn small color="pink lighten-2" @click="onColor('pink lighten-2')">-2</VBtn>
            <VBtn small color="pink lighten-1" @click="onColor('pink lighten-1')">-1</VBtn>
            <VBtn small color="pink" width="100px" class="mx-4" @click="onColor('pink')">pink</VBtn>
            <VBtn small color="pink darken-1" dark @click="onColor('pink darken-1')">+1</VBtn>
            <VBtn small color="pink darken-2" dark @click="onColor('pink darken-2')">+2</VBtn>
            <VBtn small color="pink darken-3" dark @click="onColor('pink darken-3')">+3</VBtn>
            <VBtn small color="pink darken-4" dark @click="onColor('pink darken-4')">+4</VBtn>
            <VBtn small color="pink accent-1" class="ml-4" @click="onColor('pink accent-1')">
              a1
            </VBtn>
            <VBtn small color="pink accent-2" @click="onColor('pink accent-2')">a2</VBtn>
            <VBtn small color="pink accent-3" @click="onColor('pink accent-3')">a3</VBtn>
            <VBtn small color="pink accent-4" @click="onColor('pink accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="purple lighten-5" @click="onColor('purple lighten-5')">-5</VBtn>
            <VBtn small color="purple lighten-4" @click="onColor('purple lighten-4')">-4</VBtn>
            <VBtn small color="purple lighten-3" @click="onColor('purple lighten-3')">-3</VBtn>
            <VBtn small color="purple lighten-2" @click="onColor('purple lighten-2')">-2</VBtn>
            <VBtn small color="purple lighten-1" @click="onColor('purple lighten-1')">-1</VBtn>
            <VBtn small color="purple" dark width="100px" class="mx-4" @click="onColor('purple')">
              purple
            </VBtn>
            <VBtn small color="purple darken-1" dark @click="onColor('purple darken-1')">+1</VBtn>
            <VBtn small color="purple darken-2" dark @click="onColor('purple darken-2')">+2</VBtn>
            <VBtn small color="purple darken-3" dark @click="onColor('purple darken-3')">+3</VBtn>
            <VBtn small color="purple darken-4" dark @click="onColor('purple darken-4')">+4</VBtn>
            <VBtn small color="purple accent-1" class="ml-4" @click="onColor('purple accent-1')">
              a1
            </VBtn>
            <VBtn small color="purple accent-2" @click="onColor('purple accent-2')">a2</VBtn>
            <VBtn small color="purple accent-3" @click="onColor('purple accent-3')">a3</VBtn>
            <VBtn small color="purple accent-4" @click="onColor('purple accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="deep-purple lighten-5" @click="onColor('deep-purple lighten-5')">
              -5
            </VBtn>
            <VBtn small color="deep-purple lighten-4" @click="onColor('deep-purple lighten-4')">
              -4
            </VBtn>
            <VBtn small color="deep-purple lighten-3" @click="onColor('deep-purple lighten-3')">
              -3
            </VBtn>
            <VBtn small color="deep-purple lighten-2" @click="onColor('deep-purple lighten-2')">
              -2
            </VBtn>
            <VBtn small color="deep-purple lighten-1" @click="onColor('deep-purple lighten-1')">
              -1
            </VBtn>
            <VBtn
              small
              color="deep-purple"
              dark
              width="100px"
              class="mx-4"
              @click="onColor('deep-purple')"
            >
              deep-purple
            </VBtn>
            <VBtn small color="deep-purple darken-1" dark @click="onColor('deep-purple darken-1')">
              +1
            </VBtn>
            <VBtn small color="deep-purple darken-2" dark @click="onColor('deep-purple darken-2')">
              +2
            </VBtn>
            <VBtn small color="deep-purple darken-3" dark @click="onColor('deep-purple darken-3')">
              +3
            </VBtn>
            <VBtn small color="deep-purple darken-4" dark @click="onColor('deep-purple darken-4')">
              +4
            </VBtn>
            <VBtn
              small
              color="deep-purple accent-1"
              class="ml-4"
              @click="onColor('deep-purple accent-1')"
            >
              a1
            </VBtn>
            <VBtn small color="deep-purple accent-2" @click="onColor('deep-purple accent-2')">
              a2
            </VBtn>
            <VBtn small color="deep-purple accent-3" @click="onColor('deep-purple accent-3')">
              a3
            </VBtn>
            <VBtn small color="deep-purple accent-4" @click="onColor('deep-purple accent-4')">
              a4
            </VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="indigo lighten-5" @click="onColor('indigo lighten-5')">-5</VBtn>
            <VBtn small color="indigo lighten-4" @click="onColor('indigo lighten-4')">-4</VBtn>
            <VBtn small color="indigo lighten-3" @click="onColor('indigo lighten-3')">-3</VBtn>
            <VBtn small color="indigo lighten-2" @click="onColor('indigo lighten-2')">-2</VBtn>
            <VBtn small color="indigo lighten-1" @click="onColor('indigo lighten-1')">-1</VBtn>
            <VBtn small color="indigo" dark width="100px" class="mx-4" @click="onColor('indigo')">
              indigo
            </VBtn>
            <VBtn small color="indigo darken-1" dark @click="onColor('indigo darken-1')">+1</VBtn>
            <VBtn small color="indigo darken-2" dark @click="onColor('indigo darken-2')">+2</VBtn>
            <VBtn small color="indigo darken-3" dark @click="onColor('indigo darken-3')">+3</VBtn>
            <VBtn small color="indigo darken-4" dark @click="onColor('indigo darken-4')">+4</VBtn>
            <VBtn small color="indigo accent-1" class="ml-4" @click="onColor('indigo accent-1')">
              a1
            </VBtn>
            <VBtn small color="indigo accent-2" @click="onColor('indigo accent-2')">a2</VBtn>
            <VBtn small color="indigo accent-3" @click="onColor('indigo accent-3')">a3</VBtn>
            <VBtn small color="indigo accent-4" @click="onColor('indigo accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="blue lighten-5" @click="onColor('blue lighten-5')">-5</VBtn>
            <VBtn small color="blue lighten-4" @click="onColor('blue lighten-4')">-4</VBtn>
            <VBtn small color="blue lighten-3" @click="onColor('blue lighten-3')">-3</VBtn>
            <VBtn small color="blue lighten-2" @click="onColor('blue lighten-2')">-2</VBtn>
            <VBtn small color="blue lighten-1" @click="onColor('blue lighten-1')">-1</VBtn>
            <VBtn small color="blue" width="100px" class="mx-4" @click="onColor('blue')">blue</VBtn>
            <VBtn small color="blue darken-1" dark @click="onColor('blue darken-1')">+1</VBtn>
            <VBtn small color="blue darken-2" dark @click="onColor('blue darken-2')">+2</VBtn>
            <VBtn small color="blue darken-3" dark @click="onColor('blue darken-3')">+3</VBtn>
            <VBtn small color="blue darken-4" dark @click="onColor('blue darken-4')">+4</VBtn>
            <VBtn small color="blue accent-1" class="ml-4" @click="onColor('blue accent-1')">
              a1
            </VBtn>
            <VBtn small color="blue accent-2" @click="onColor('blue accent-2')">a2</VBtn>
            <VBtn small color="blue accent-3" @click="onColor('blue accent-3')">a3</VBtn>
            <VBtn small color="blue accent-4" @click="onColor('blue accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="light-blue lighten-5" @click="onColor('light-blue lighten-5')">
              -5
            </VBtn>
            <VBtn small color="light-blue lighten-4" @click="onColor('light-blue lighten-4')">
              -4
            </VBtn>
            <VBtn small color="light-blue lighten-3" @click="onColor('light-blue lighten-3')">
              -3
            </VBtn>
            <VBtn small color="light-blue lighten-2" @click="onColor('light-blue lighten-2')">
              -2
            </VBtn>
            <VBtn small color="light-blue lighten-1" @click="onColor('light-blue lighten-1')">
              -1
            </VBtn>
            <VBtn
              small
              color="light-blue"
              width="100px"
              class="mx-4"
              @click="onColor('light-blue')"
            >
              light-blue
            </VBtn>
            <VBtn small color="light-blue darken-1" dark @click="onColor('light-blue darken-1')">
              +1
            </VBtn>
            <VBtn small color="light-blue darken-2" dark @click="onColor('light-blue darken-2')">
              +2
            </VBtn>
            <VBtn small color="light-blue darken-3" dark @click="onColor('light-blue darken-3')">
              +3
            </VBtn>
            <VBtn small color="light-blue darken-4" dark @click="onColor('light-blue darken-4')">
              +4
            </VBtn>
            <VBtn
              small
              color="light-blue accent-1"
              class="ml-4"
              @click="onColor('light-blue accent-1')"
            >
              a1
            </VBtn>
            <VBtn small color="light-blue accent-2" @click="onColor('light-blue accent-2')">
              a2
            </VBtn>
            <VBtn small color="light-blue accent-3" @click="onColor('light-blue accent-3')">
              a3
            </VBtn>
            <VBtn small color="light-blue accent-4" @click="onColor('light-blue accent-4')">
              a4
            </VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="cyan lighten-5" @click="onColor('cyan lighten-5')">-5</VBtn>
            <VBtn small color="cyan lighten-4" @click="onColor('cyan lighten-4')">-4</VBtn>
            <VBtn small color="cyan lighten-3" @click="onColor('cyan lighten-3')">-3</VBtn>
            <VBtn small color="cyan lighten-2" @click="onColor('cyan lighten-2')">-2</VBtn>
            <VBtn small color="cyan lighten-1" @click="onColor('cyan lighten-1')">-1</VBtn>
            <VBtn small color="cyan" width="100px" class="mx-4" @click="onColor('cyan')">cyan</VBtn>
            <VBtn small color="cyan darken-1" dark @click="onColor('cyan darken-1')">+1</VBtn>
            <VBtn small color="cyan darken-2" dark @click="onColor('cyan darken-2')">+2</VBtn>
            <VBtn small color="cyan darken-3" dark @click="onColor('cyan darken-3')">+3</VBtn>
            <VBtn small color="cyan darken-4" dark @click="onColor('cyan darken-4')">+4</VBtn>
            <VBtn small color="cyan accent-1" class="ml-4" @click="onColor('cyan accent-1')">
              a1
            </VBtn>
            <VBtn small color="cyan accent-2" @click="onColor('cyan accent-2')">a2</VBtn>
            <VBtn small color="cyan accent-3" @click="onColor('cyan accent-3')">a3</VBtn>
            <VBtn small color="cyan accent-4" @click="onColor('cyan accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="teal lighten-5" @click="onColor('teal lighten-5')">-5</VBtn>
            <VBtn small color="teal lighten-4" @click="onColor('teal lighten-4')">-4</VBtn>
            <VBtn small color="teal lighten-3" @click="onColor('teal lighten-3')">-3</VBtn>
            <VBtn small color="teal lighten-2" @click="onColor('teal lighten-2')">-2</VBtn>
            <VBtn small color="teal lighten-1" @click="onColor('teal lighten-1')">-1</VBtn>
            <VBtn small color="teal" dark width="100px" class="mx-4" @click="onColor('teal')">
              teal
            </VBtn>
            <VBtn small color="teal darken-1" dark @click="onColor('teal darken-1')">+1</VBtn>
            <VBtn small color="teal darken-2" dark @click="onColor('teal darken-2')">+2</VBtn>
            <VBtn small color="teal darken-3" dark @click="onColor('teal darken-3')">+3</VBtn>
            <VBtn small color="teal darken-4" dark @click="onColor('teal darken-4')">+4</VBtn>
            <VBtn small color="teal accent-1" class="ml-4" @click="onColor('teal accent-1')">
              a1
            </VBtn>
            <VBtn small color="teal accent-2" @click="onColor('teal accent-2')">a2</VBtn>
            <VBtn small color="teal accent-3" @click="onColor('teal accent-3')">a3</VBtn>
            <VBtn small color="teal accent-4" @click="onColor('teal accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="green lighten-5" @click="onColor('green lighten-5')">-5</VBtn>
            <VBtn small color="green lighten-4" @click="onColor('green lighten-4')">-4</VBtn>
            <VBtn small color="green lighten-3" @click="onColor('green lighten-3')">-3</VBtn>
            <VBtn small color="green lighten-2" @click="onColor('green lighten-2')">-2</VBtn>
            <VBtn small color="green lighten-1" @click="onColor('green lighten-1')">-1</VBtn>
            <VBtn small color="green" width="100px" class="mx-4" @click="onColor('green')">
              green
            </VBtn>
            <VBtn small color="green darken-1" dark @click="onColor('green darken-1')">+1</VBtn>
            <VBtn small color="green darken-2" dark @click="onColor('green darken-2')">+2</VBtn>
            <VBtn small color="green darken-3" dark @click="onColor('green darken-3')">+3</VBtn>
            <VBtn small color="green darken-4" dark @click="onColor('green darken-4')">+4</VBtn>
            <VBtn small color="green accent-1" class="ml-4" @click="onColor('green accent-1')">
              a1
            </VBtn>
            <VBtn small color="green accent-2" @click="onColor('green accent-2')">a2</VBtn>
            <VBtn small color="green accent-3" @click="onColor('green accent-3')">a3</VBtn>
            <VBtn small color="green accent-4" @click="onColor('green accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="light-green lighten-5" @click="onColor('light-green lighten-5')">
              -5
            </VBtn>
            <VBtn small color="light-green lighten-4" @click="onColor('light-green lighten-4')">
              -4
            </VBtn>
            <VBtn small color="light-green lighten-3" @click="onColor('light-green lighten-3')">
              -3
            </VBtn>
            <VBtn small color="light-green lighten-2" @click="onColor('light-green lighten-2')">
              -2
            </VBtn>
            <VBtn small color="light-green lighten-1" @click="onColor('light-green lighten-1')">
              -1
            </VBtn>
            <VBtn
              small
              color="light-green"
              width="100px"
              class="mx-4"
              @click="onColor('light-green')"
            >
              light-green
            </VBtn>
            <VBtn small color="light-green darken-1" dark @click="onColor('light-green darken-1')">
              +1
            </VBtn>
            <VBtn small color="light-green darken-2" dark @click="onColor('light-green darken-2')">
              +2
            </VBtn>
            <VBtn small color="light-green darken-3" dark @click="onColor('light-green darken-3')">
              +3
            </VBtn>
            <VBtn small color="light-green darken-4" dark @click="onColor('light-green darken-4')">
              +4
            </VBtn>
            <VBtn
              small
              color="light-green accent-1"
              class="ml-4"
              @click="onColor('light-green accent-1')"
            >
              a1
            </VBtn>
            <VBtn small color="light-green accent-2" @click="onColor('light-green accent-2')">
              a2
            </VBtn>
            <VBtn small color="light-green accent-3" @click="onColor('light-green accent-3')">
              a3
            </VBtn>
            <VBtn small color="light-green accent-4" @click="onColor('light-green accent-4')">
              a4
            </VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="lime lighten-5" @click="onColor('lime lighten-5')">-5</VBtn>
            <VBtn small color="lime lighten-4" @click="onColor('lime lighten-4')">-4</VBtn>
            <VBtn small color="lime lighten-3" @click="onColor('lime lighten-3')">-3</VBtn>
            <VBtn small color="lime lighten-2" @click="onColor('lime lighten-2')">-2</VBtn>
            <VBtn small color="lime lighten-1" @click="onColor('lime lighten-1')">-1</VBtn>
            <VBtn small color="lime" width="100px" class="mx-4" @click="onColor('lime')">lime</VBtn>
            <VBtn small color="lime darken-1" dark @click="onColor('lime darken-1')">+1</VBtn>
            <VBtn small color="lime darken-2" dark @click="onColor('lime darken-2')">+2</VBtn>
            <VBtn small color="lime darken-3" dark @click="onColor('lime darken-3')">+3</VBtn>
            <VBtn small color="lime darken-4" dark @click="onColor('lime darken-4')">+4</VBtn>
            <VBtn small color="lime accent-1" class="ml-4" @click="onColor('lime accent-1')">
              a1
            </VBtn>
            <VBtn small color="lime accent-2" @click="onColor('lime accent-2')">a2</VBtn>
            <VBtn small color="lime accent-3" @click="onColor('lime accent-3')">a3</VBtn>
            <VBtn small color="lime accent-4" @click="onColor('lime accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="yellow lighten-5" @click="onColor('yellow lighten-5')">-5</VBtn>
            <VBtn small color="yellow lighten-4" @click="onColor('yellow lighten-4')">-4</VBtn>
            <VBtn small color="yellow lighten-3" @click="onColor('yellow lighten-3')">-3</VBtn>
            <VBtn small color="yellow lighten-2" @click="onColor('yellow lighten-2')">-2</VBtn>
            <VBtn small color="yellow lighten-1" @click="onColor('yellow lighten-1')">-1</VBtn>
            <VBtn small color="yellow" width="100px" class="mx-4" @click="onColor('yellow')">
              yellow
            </VBtn>
            <VBtn small color="yellow darken-1" dark @click="onColor('yellow darken-1')">+1</VBtn>
            <VBtn small color="yellow darken-2" dark @click="onColor('yellow darken-2')">+2</VBtn>
            <VBtn small color="yellow darken-3" dark @click="onColor('yellow darken-3')">+3</VBtn>
            <VBtn small color="yellow darken-4" dark @click="onColor('yellow darken-4')">+4</VBtn>
            <VBtn small color="yellow accent-1" class="ml-4" @click="onColor('yellow accent-1')">
              a1
            </VBtn>
            <VBtn small color="yellow accent-2" @click="onColor('yellow accent-2')">a2</VBtn>
            <VBtn small color="yellow accent-3" @click="onColor('yellow accent-3')">a3</VBtn>
            <VBtn small color="yellow accent-4" @click="onColor('yellow accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="amber lighten-5" @click="onColor('amber lighten-5')">-5</VBtn>
            <VBtn small color="amber lighten-4" @click="onColor('amber lighten-4')">-4</VBtn>
            <VBtn small color="amber lighten-3" @click="onColor('amber lighten-3')">-3</VBtn>
            <VBtn small color="amber lighten-2" @click="onColor('amber lighten-2')">-2</VBtn>
            <VBtn small color="amber lighten-1" @click="onColor('amber lighten-1')">-1</VBtn>
            <VBtn small color="amber" width="100px" class="mx-4" @click="onColor('amber')">
              amber
            </VBtn>
            <VBtn small color="amber darken-1" dark @click="onColor('amber darken-1')">+1</VBtn>
            <VBtn small color="amber darken-2" dark @click="onColor('amber darken-2')">+2</VBtn>
            <VBtn small color="amber darken-3" dark @click="onColor('amber darken-3')">+3</VBtn>
            <VBtn small color="amber darken-4" dark @click="onColor('amber darken-4')">+4</VBtn>
            <VBtn small color="amber accent-1" class="ml-4" @click="onColor('amber accent-1')">
              a1
            </VBtn>
            <VBtn small color="amber accent-2" @click="onColor('amber accent-2')">a2</VBtn>
            <VBtn small color="amber accent-3" @click="onColor('amber accent-3')">a3</VBtn>
            <VBtn small color="amber accent-4" @click="onColor('amber accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="orange lighten-5" @click="onColor('orange lighten-5')">-5</VBtn>
            <VBtn small color="orange lighten-4" @click="onColor('orange lighten-4')">-4</VBtn>
            <VBtn small color="orange lighten-3" @click="onColor('orange lighten-3')">-3</VBtn>
            <VBtn small color="orange lighten-2" @click="onColor('orange lighten-2')">-2</VBtn>
            <VBtn small color="orange lighten-1" @click="onColor('orange lighten-1')">-1</VBtn>
            <VBtn small color="orange" width="100px" class="mx-4" @click="onColor('orange')">
              orange
            </VBtn>
            <VBtn small color="orange darken-1" dark @click="onColor('orange darken-1')">+1</VBtn>
            <VBtn small color="orange darken-2" dark @click="onColor('orange darken-2')">+2</VBtn>
            <VBtn small color="orange darken-3" dark @click="onColor('orange darken-3')">+3</VBtn>
            <VBtn small color="orange darken-4" dark @click="onColor('orange darken-4')">+4</VBtn>
            <VBtn small color="orange accent-1" class="ml-4" @click="onColor('orange accent-1')">
              a1
            </VBtn>
            <VBtn small color="orange accent-2" @click="onColor('orange accent-2')">a2</VBtn>
            <VBtn small color="orange accent-3" @click="onColor('orange accent-3')">a3</VBtn>
            <VBtn small color="orange accent-4" @click="onColor('orange accent-4')">a4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="deep-orange lighten-5" @click="onColor('deep-orange lighten-5')">
              -5
            </VBtn>
            <VBtn small color="deep-orange lighten-4" @click="onColor('deep-orange lighten-4')">
              -4
            </VBtn>
            <VBtn small color="deep-orange lighten-3" @click="onColor('deep-orange lighten-3')">
              -3
            </VBtn>
            <VBtn small color="deep-orange lighten-2" @click="onColor('deep-orange lighten-2')">
              -2
            </VBtn>
            <VBtn small color="deep-orange lighten-1" @click="onColor('deep-orange lighten-1')">
              -1
            </VBtn>
            <VBtn
              small
              color="deep-orange"
              width="100px"
              class="mx-4"
              @click="onColor('deep-orange')"
            >
              deep-orange
            </VBtn>
            <VBtn small color="deep-orange darken-1" dark @click="onColor('deep-orange darken-1')">
              +1
            </VBtn>
            <VBtn small color="deep-orange darken-2" dark @click="onColor('deep-orange darken-2')">
              +2
            </VBtn>
            <VBtn small color="deep-orange darken-3" dark @click="onColor('deep-orange darken-3')">
              +3
            </VBtn>
            <VBtn small color="deep-orange darken-4" dark @click="onColor('deep-orange darken-4')">
              +4
            </VBtn>
            <VBtn
              small
              color="deep-orange accent-1"
              class="ml-4"
              @click="onColor('deep-orange accent-1')"
            >
              a1
            </VBtn>
            <VBtn small color="deep-orange accent-2" @click="onColor('deep-orange accent-2')">
              a2
            </VBtn>
            <VBtn small color="deep-orange accent-3" @click="onColor('deep-orange accent-3')">
              a3
            </VBtn>
            <VBtn small color="deep-orange accent-4" @click="onColor('deep-orange accent-4')">
              a4
            </VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="brown lighten-5" @click="onColor('brown lighten-5')">-5</VBtn>
            <VBtn small color="brown lighten-4" @click="onColor('brown lighten-4')">-4</VBtn>
            <VBtn small color="brown lighten-3" @click="onColor('brown lighten-3')">-3</VBtn>
            <VBtn small color="brown lighten-2" @click="onColor('brown lighten-2')">-2</VBtn>
            <VBtn small color="brown lighten-1" @click="onColor('brown lighten-1')">-1</VBtn>
            <VBtn small color="brown" dark width="100px" class="mx-4" @click="onColor('brown')">
              brown
            </VBtn>
            <VBtn small color="brown darken-1" dark @click="onColor('brown darken-1')">+1</VBtn>
            <VBtn small color="brown darken-2" dark @click="onColor('brown darken-2')">+2</VBtn>
            <VBtn small color="brown darken-3" dark @click="onColor('brown darken-3')">+3</VBtn>
            <VBtn small color="brown darken-4" dark @click="onColor('brown darken-4')">+4</VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="blue-grey lighten-5" @click="onColor('blue-grey lighten-5')">
              -5
            </VBtn>
            <VBtn small color="blue-grey lighten-4" @click="onColor('blue-grey lighten-4')">
              -4
            </VBtn>
            <VBtn small color="blue-grey lighten-3" @click="onColor('blue-grey lighten-3')">
              -3
            </VBtn>
            <VBtn small color="blue-grey lighten-2" @click="onColor('blue-grey lighten-2')">
              -2
            </VBtn>
            <VBtn small color="blue-grey lighten-1" @click="onColor('blue-grey lighten-1')">
              -1
            </VBtn>
            <VBtn
              small
              color="blue-grey"
              dark
              width="100px"
              class="mx-4"
              @click="onColor('blue-grey')"
            >
              blue-grey
            </VBtn>
            <VBtn small color="blue-grey darken-1" dark @click="onColor('blue-grey darken-1')">
              +1
            </VBtn>
            <VBtn small color="blue-grey darken-2" dark @click="onColor('blue-grey darken-2')">
              +2
            </VBtn>
            <VBtn small color="blue-grey darken-3" dark @click="onColor('blue-grey darken-3')">
              +3
            </VBtn>
            <VBtn small color="blue-grey darken-4" dark @click="onColor('blue-grey darken-4')">
              +4
            </VBtn>
          </div>
          <div class="mt-1">
            <VBtn small color="grey lighten-5" @click="onColor('grey lighten-5')">-5</VBtn>
            <VBtn small color="grey lighten-4" @click="onColor('grey lighten-4')">-4</VBtn>
            <VBtn small color="grey lighten-3" @click="onColor('grey lighten-3')">-3</VBtn>
            <VBtn small color="grey lighten-2" @click="onColor('grey lighten-2')">-2</VBtn>
            <VBtn small color="grey lighten-1" @click="onColor('grey lighten-1')">-1</VBtn>
            <VBtn small color="grey" width="100px" class="mx-4" @click="onColor('grey')">grey</VBtn>
            <VBtn small color="grey darken-1" dark @click="onColor('grey darken-1')">+1</VBtn>
            <VBtn small color="grey darken-2" dark @click="onColor('grey darken-2')">+2</VBtn>
            <VBtn small color="grey darken-3" dark @click="onColor('grey darken-3')">+3</VBtn>
            <VBtn small color="grey darken-4" dark @click="onColor('grey darken-4')">+4</VBtn>
          </div>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AttributeModal',
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, { emit }) {
    const onColor = (color: string) => {
      emit('select', color)
      emit('is-open', false)
    }

    return {
      onColor,
    }
  },
})
</script>
