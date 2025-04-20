import { Flex, Text } from "@chakra-ui/react";

const Contact: React.FC = () => {
  return (
    <>
      <Text fontSize="2xl" textAlign="center" color="black" mt={4}>
        Contact Us at:
      </Text>
      <Flex className="center-row text-black">
        <Text>Email</Text>
        <Text>Phone Number</Text>
      </Flex>
    </>
  );
};

export default Contact;
