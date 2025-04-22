import { Flex, Text, VStack, Link, Icon } from "@chakra-ui/react";
import { MdEmail, MdPhone } from "react-icons/md";

const Contact: React.FC = () => {
  return (
    <VStack align="center" justify="center" minH="60vh" mt={8} px={4}>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
        className="text-color-primary"
      >
        Get in Touch with Little Italy
      </Text>

      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Flex align="center" mr={{ md: 8 }} mb={{ base: 4, md: 0 }}>
          <Icon as={MdEmail} fontSize="2xl" color="red.500" mr={2} />
          <Link
            href="mailto:littleitaly@example.com"
            color="blue.500"
            fontWeight="medium"
          >
            littleitaly@example.com
          </Link>
        </Flex>

        <Flex align="center">
          <Icon as={MdPhone} fontSize="2xl" color="green.500" mr={2} />
          <Text color="black" fontWeight="medium">
            +1 234 567 890
          </Text>
        </Flex>
      </Flex>

      <Text fontSize="sm" className="text-color-primary" textAlign="center">
        We'd love to hear from you! Feel free to reach out with any inquiries or
        feedback.
      </Text>
    </VStack>
  );
};

export default Contact;
