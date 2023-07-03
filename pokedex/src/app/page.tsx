'use client'


import styles from './page.module.css'

import { Box, Container, HStack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import Link from 'next/link'


async function getPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=8')
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch pokemon data')
  }
 
  return res.json()
}
 

export default async function Home() {
  const dataPokemon = await getPokemon()
  const resultPokemon = dataPokemon.results

  // add type to pokemon 
  resultPokemon[0].type = ['Grass', 'Poison']
  resultPokemon[1].type = ['Grass', 'Poison']
  resultPokemon[2].type = ['Grass', 'Poison']
  resultPokemon[3].type = ['Fire']
  resultPokemon[4].type = ['Fire']
  resultPokemon[5].type = ['Fire', 'Flying']
  resultPokemon[6].type = ['Water']
  resultPokemon[7].type = ['Water']

  // add color to pokemon 
  resultPokemon[0].color = ['#49d0b1', '#5edfc6'] // green
  resultPokemon[1].color = ['#49d0b1', '#5edfc6'] 
  resultPokemon[2].color = ['#49d0b1', '#5edfc6'] 
  resultPokemon[3].color = ['#fc6c6d', '#fc7f7f']  // red
  resultPokemon[4].color = ['#fc6c6d', '#fc7f7f']
  resultPokemon[5].color = ['#fc6c6d', '#fc7f7f']
  resultPokemon[6].color = ['#76beff', '#85cafe'] // blue
  resultPokemon[7].color = ['#76beff', '#85cafe'] 
  

  return (
    <main className={styles.main}>
      <Container width={'100vw'} minHeight={'100vh'} bg={'#f2f3f2'}>
        <Container mt={'5em'}>
          <Text fontSize={'4xl'} color={'black'} as={'b'} >Pokedex</Text>
        </Container>
        <Grid mt={'2em'}
          p={2}
          templateColumns='repeat(2, 1fr)'
          gap={'0.6em'}
        >
          {resultPokemon.map((pokemon: any, index:any) => (
            <Link href={`/${index + 1}`}>
              <GridItem
                display={'block'}
                borderRadius={'2xl'}
                p={'1em'}
                bgColor={pokemon.color[0]}
                pl={'1.3em'}
                height={'9em'}
              >
                <Text
                  color={'white'}
                  fontWeight={'600'}
                  pt={'0.5em'}
                  fontSize={'2xl'}
                >{pokemon.name}</Text>

                <Flex>
                  <Flex direction={'column'} gap={'0.5em'}>
                    {pokemon.type.map((tipe:any) => (
                      <Box bgColor={pokemon.color[1]} borderRadius={'3xl'} pl={'0.8em'} pr={'0.8em'}>
                        <Text>{tipe}</Text>
                      </Box>
                    ))}
                  </Flex>
                  <Spacer />
                  <Flex>
                    <Image src={'gaming.png'} alt='pokemon' width={'3.5em'} height={'3.5em'} zIndex={'0'} />
                  </Flex>

                </Flex>
              </GridItem>
            </Link>
          ))}
        </Grid>
      </Container>
    </main>
  )
}
