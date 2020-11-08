import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('screen')
export const ScrollableModal = ({
  children,
  visible = false,
  onClose = () => { },
  coverScreen = true,
}) => {
  const scrollRef = useRef<ScrollView>(null)
  const [scrollOffset, setScrollOffset] = useState(0)

  const handleScrollTo = (p: any) => {
    scrollRef.current?.scrollTo(p);
  }

  const handleOnScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y
    setScrollOffset(offsetY)
  }

  return (
    <Modal
      testID={'modal'}
      isVisible={visible}
      onSwipeComplete={onClose}
      coverScreen={coverScreen}
      hasBackdrop={coverScreen}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={height * 0.30 - 300} // content height - ScrollView height
      propagateSwipe={true}
      style={styles.modal}>
      <View style={styles.scrollableModal}>
        <ScrollView
          ref={scrollRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}>
          <Layout style={styles.modalContainer}>
            {children}
          </Layout>
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: height * 0.30,
  },
  modalContainer: {
    height: height * 0.30,
    padding: 10,
    borderTopStartRadius: 15,
    borderTopRightRadius: 15
  }
});

export default ScrollableModal;