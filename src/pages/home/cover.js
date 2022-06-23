import { useEffect, useRef, useState, forwardRef } from 'react'
import { useWindowScroll, useWindowSize } from 'react-use'

const COVER_HEIGHT = 400

const BUFFER_HEIGHT = 160

export const Cover = forwardRef(({ changeButtonColor }, ref) => {
  const [size, setSize] = useState(COVER_HEIGHT)
  const scrollRef = useRef(null)
  const { y } = useWindowScroll()

  const [top, setTop] = useState()
  const [radius, setRadius] = useState(0)
  const [_width, setWidth] = useState(0)
  const [_height, setHeight] = useState(0)

  const bgRef = useRef(null)

  const { width, height } = useWindowSize()

  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
  }, [])

  useEffect(() => {
    setWidth(width)
  }, [width])

  useEffect(() => {
    setHeight(height)
  }, [height])

  useEffect(() => {
    if (scrollRef.current.getBoundingClientRect().top > 0) {
      setTop(scrollRef.current.getBoundingClientRect().top)
    }
  }, [y, _height, _width])

  useEffect(() => {
    let _size = 0
    if (_width && _height && top) {
      _size = ((_height - COVER_HEIGHT / 2 - top) / _height) * (_width + 1000) * 2 + COVER_HEIGHT
      setSize(_size)
    }
    if (top - (_height - COVER_HEIGHT) / 2 >= BUFFER_HEIGHT / 2) {
      setRadius(top - (_height - COVER_HEIGHT) / 2)
    }
    changeButtonColor && changeButtonColor(bgRef.current?.getBoundingClientRect()?.top, _size, top)
  }, [top, _height, _width])

  return (
    <div
      style={{
        height: `${_height + BUFFER_HEIGHT}px`,
        position: 'absolute',
        top: `${(_height - BUFFER_HEIGHT) / 2}px`,
        overflow: `${top && top < (_height - COVER_HEIGHT) / 2 ? 'hidden' : 'visible'}`,
        borderBottomLeftRadius: `${radius}px`,
        borderBottomRightRadius: `${radius}px`,
      }}
      className=" w-full flex justify-center items-center z-30"
    >
      <div
        ref={bgRef}
        style={{ height: size, width: size }}
        className={`bg-[#654aec] flex justify-center items-center rounded-full `}
      >
        <img
          style={{ objectFit: 'cover' }}
          ref={scrollRef}
          src={require('./images/video-placeholder.png').default}
          className={'w-[400px] h-[400px] bg-[#fdf1c0]  rounded-full'}
          alt={'video'}
        />
      </div>
    </div>
  )
})
