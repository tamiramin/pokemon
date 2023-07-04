'use client'
import { motion } from "framer-motion"

import styles from './page.module.css'

import { Box, Container } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import Link from 'next/link'


async function getOnePokemon(url: any) {
  const data = await fetch(url)
    
  if (!data.ok) {
    throw new Error('Failed to fetch pokemon data')
  }

  return (data).json()
}

async function getPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=8')

  if (!res.ok) {
    throw new Error('Failed to fetch pokemon data')
  }
 
  return res.json()
}
 

export default async function Home() {
  const dataPokemon = await getPokemon()

  const resultPokemon = dataPokemon.results

  var pokemonsDetail:any[] = []
  for (let i = 0; i < resultPokemon.length; i++){
    pokemonsDetail.push({
      name: resultPokemon[i].name,
      data: await getOnePokemon(resultPokemon[i].url)
  })
  }

  // add color to pokemon 
  pokemonsDetail[0].data.color = ['#49d0b1', '#5edfc6'] // green
  pokemonsDetail[1].data.color = ['#49d0b1', '#5edfc6'] 
  pokemonsDetail[2].data.color = ['#49d0b1', '#5edfc6'] 
  pokemonsDetail[3].data.color = ['#fc6c6d', '#fc7f7f']  // red
  pokemonsDetail[4].data.color = ['#fc6c6d', '#fc7f7f']
  pokemonsDetail[5].data.color = ['#fc6c6d', '#fc7f7f']
  pokemonsDetail[6].data.color = ['#76beff', '#85cafe'] // blue
  pokemonsDetail[7].data.color = ['#76beff', '#85cafe'] 

  for (let i = 0; i < pokemonsDetail.length; i++){
    pokemonsDetail[i].name = pokemonsDetail[i].name.charAt(0).toUpperCase() + pokemonsDetail[i].name.slice(1);
  }

  return (
    <main className={styles.main}>
      <Container width={'100vw'} minHeight={'100vh'} bg={'#f2f3f2'} p={'0.5em'}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5}}
        >
          <Container mt={'5em'}>
            <Text fontSize={'4xl'} color={'black'} as={'b'} >Pokedex</Text>
          </Container>
        </motion.div>
        <Grid
          mt={'2em'}
          p={2}
          gap={'0.6em'}
          templateColumns={'repeat(2, 1fr)'}
        >
          {pokemonsDetail.map((pokemon: any, index: any) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index*0.3}}
            >
              <Link href={`/${index + 1}`}>
                <GridItem
                  display={'block'}
                  borderRadius={'2xl'}
                  p={'1em'}
                  bgColor={pokemon.data.color[0]}
                  pl={'1.3em'}
                  height={'9em'}
                >
                  <Text
                    color={'white'}
                    fontWeight={'600'}
                    pt={'0.5em'}
                    fontSize={'1.3em'}
                    
                  >{pokemon.name}</Text>

                  <Flex>
                    <Flex direction={'column'} gap={'0.5em'}>
                      {pokemon.data.types.map((tipe:any) => (
                        <Box bgColor={pokemon.data.color[1]} borderRadius={'3xl'} pl={'0.8em'} pr={'0.8em'}>
                          <Text fontSize={'0.8em'} color={'white'}>{tipe.type.name}</Text>
                        </Box>
                      ))}
                    </Flex>
                    <Spacer />
                    <Flex mt={'-0.5em'} >
                      <Image src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${index+1}.png`} alt='pokemon' width={'4.5em'} height={'4.5em'}/>
                    </Flex>

                  </Flex>
                </GridItem>
              </Link>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </main>
  )
}
