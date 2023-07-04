'use client'
import { motion } from "framer-motion"

import { Container, Flex, Text, Box, Image } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'
import Link from "next/link";

async function getOnePokemon(url: any) {
    const data = await fetch(url)
      
    if (!data.ok) {
      throw new Error('Failed to fetch pokemon data')
    }
  
    return (data).json()
}


export default async function Page({ params }: { params: { slug: number } }) {

    const pokemon = await getOnePokemon(`https://pokeapi.co/api/v2/pokemon/${params.slug}/`)
    var color:any[] = []
    if (params.slug <= 3) {
        color.push('#49d0b1', '#5edfc6')
    }
    else if (params.slug > 3 && params.slug < 7) {
        color.push('#fc6c6d', '#fc7f7f')
    }
    else {
        color.push('#76beff', '#85cafe')
    }
    
    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemon.species.name = pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1);

    var abilitiesView = ""
    for (let i = 0; i < pokemon.abilities.length; i++){
        if (i !== (pokemon.abilities.length - 1)) {
            abilitiesView += pokemon.abilities[i].ability.name  + ", "
        }
        else {
            abilitiesView += pokemon.abilities[i].ability.name
        }
    }
    
    return (
        <Container bg={color[0]} width={'100vw'} height={'100vh'} pt={'1.5em'} pl={0} pr={0}>
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5}}
        >
            <Link href='/'><Text color={'blackAlpha.600'} fontSize={'2xl'} as={'b'} pl={'1em'} opacity={1}>Pokedex</Text></Link>
            <motion.div
                initial={{ opacity: 0, x:-10}}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3}}
            >
                <Flex justifyContent={'space-between'} p={'1.5em'}>
                    <Flex flexDirection={'column'}>
                        <Text fontSize={'5xl'} as={'b'} pt={'0.5em'} pb={'0.25em'} color={'white'} >{pokemon.name}</Text>
                        <Flex pl={'0.5em'} gap={2}>
                            {pokemon.types.map((tipe:any) => (
                            <Box bgColor={color[1]} borderRadius={'3xl'} p={'1.2em'} pt={'0.2em'} pb={'0.2em'}>
                                <Text fontSize={'lg'} color={'white'}>{tipe.type.name}</Text>
                            </Box>
                            ))}
                        </Flex>
                    </Flex>
                    <Flex justifyContent={'center'} alignItems={'center'}>
                        <Text as={'b'} fontSize={'1xl'} p={'0.5em'} color={'white'}>#00{params.slug}</Text>
                    </Flex>                
                </Flex>
            </motion.div>    
                
            <motion.div
                initial={{ opacity: 0, zIndex: 10, scale:1.5}}
                animate={{ opacity: 1, zIndex: 5, scale: 1 }}
                transition={{ duration: 1, delay: 1.2}}    
            >
                <Flex justifyContent={'center'} alignItems={'center'} mt={'1.5em'} zIndex={5}>
                    <Image src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${params.slug}.png`} alt='pokemon' width={'20em'} height={'20em'}/>
                </Flex> 
            </motion.div>
                
            <motion.div
                initial={{ opacity: 0, y: 80}}
                animate={{ opacity: 1, y: 0}}
                transition={{ duration: 0.8, delay: 0.3}}
            >        
                <Flex width={'100%'} minHeight={'50vh'} bg={'#f2f3f2'} mt={'-3em'} borderTopRadius={'3xl'} p={'1em'} >
                <Tabs isFitted mt={'2em'} width={'100%'} colorScheme="messenger">
                    <TabList mb='1em' color={'blackAlpha.800'}>
                        <Tab>About</Tab>
                        <Tab>Base Stats</Tab>
                        <Tab>Evolution</Tab>
                        <Tab>Moves</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <Grid
                            templateColumns='repeat(5, 1fr)'
                            gap={5}
                        >
                        <GridItem colSpan={1} ><Text color={"blackAlpha.600"}>Species</Text></GridItem>
                        <GridItem colSpan={4} ><Text color={"black"}>{ pokemon.species.name}</Text></GridItem>
                        <GridItem colSpan={1} ><Text color={"blackAlpha.600"}>Height</Text></GridItem>
                        <GridItem colSpan={4} ><Text color={"black"}>{ pokemon.height} dm</Text></GridItem>
                        <GridItem colSpan={1} ><Text color={"blackAlpha.600"}>Weight</Text></GridItem>
                        <GridItem colSpan={4} ><Text color={"black"}>{ pokemon.weight} hg</Text></GridItem>
                        <GridItem colSpan={1} ><Text color={"blackAlpha.600"}>Abilities</Text></GridItem>
                        <GridItem colSpan={4}>
                        
                            <Text color={'black'} display={'inline'}>{abilitiesView}</Text>
                                    
                        </GridItem>
                        
                        </Grid>
                        </TabPanel>
                        <TabPanel>
                        <Grid
                            templateColumns='repeat(8, 1fr)'
                            gap={5}
                        >
                        {pokemon.stats.map((st:any) => {
                            return (
                                <>    
                                    <GridItem colSpan={2} ><Text color={"blackAlpha.600"}>{st.stat.name.charAt(0).toUpperCase() + st.stat.name.slice(1)}</Text></GridItem>
                                    <GridItem colSpan={1} ><Text color={"black"}>{ st.base_stat}</Text></GridItem>
                                    <GridItem colSpan={5} p={'0.5em'}>
                                            <Progress colorScheme='messenger' value={st.base_stat} size={'xs'} />
                                    </GridItem>            
                                            
                                </>
                            )
                        })}        
                        </Grid>
                        </TabPanel>
                        <TabPanel>
                        <p>Tiga</p>
                        </TabPanel>
                        <TabPanel>
                        <p>Empat</p>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
                </Flex>            
            </motion.div>
        </motion.div>
        </Container>
    )
}