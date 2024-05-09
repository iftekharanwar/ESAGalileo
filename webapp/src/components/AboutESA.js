import React from 'react';
import { Box, Heading, Text, Image, Link } from '@chakra-ui/react';

const AboutESA = () => {
  return (
    <Box padding="4" bg="gray.700" borderRadius="lg">
      <Heading as="h2" size="xl" mb="4" color="white">
        About the European Space Agency (ESA)
      </Heading>
      <Text fontSize="md" color="gray.300">
        The European Space Agency (ESA) is Europe's gateway to space. Its mission is to shape the development of Europe's space capability and ensure that investment in space continues to deliver benefits to the citizens of Europe and the world.
      </Text>
      <Box my="5">
        <Image borderRadius="lg" src="https://api.devin.ai/attachments/e1601067-35d5-4c7c-95a6-454e0447c325/satellite-icon.png" alt="ESA Image" />
      </Box>
      <Text fontSize="md" color="gray.300" mb="4">
        ESA's activities include Earth observation, human spaceflight, launching and operating unmanned exploration missions to other planets and the Moon, and developing the technologies needed for these tasks.
      </Text>
      <Text fontSize="md" color="gray.300" mb="4">
        For more information, visit the <Link color="teal.300" href="https://www.esa.int/" isExternal>ESA website</Link>.
      </Text>
    </Box>
  );
};

export default AboutESA;
