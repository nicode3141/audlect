import React from 'react'

interface SizeProps {
  width?: number,
  height?: number
}

export function ArrowLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
        <path d="M8.87207 2L1.99956 8.87251" stroke="#757575" strokeWidth="3" strokeLinecap="round"/>
        <path d="M8.87207 16L1.99956 9.12749" stroke="#757575" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

export function ArrowDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none">
      <path d="M1.39355 1.69678L12.0002 12.3034" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
      <path d="M23 1.69678L12.3934 12.3034" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function BackArrow({ width = 11, height = 17 }: SizeProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 11 17" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.73562 8.50011L9.5 14.2645L8.38219 15.3823L1.5 8.50011L8.38219 1.61792L9.5 2.73573L3.73562 8.50011Z" fill="black" stroke="black" strokeWidth="1.5"/>
    </svg>
  )
}

export function ForwardArrow({ width = 11, height = 17 }: SizeProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 11 17" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.26438 8.50013L1.5 2.73575L2.61781 1.61794L9.5 8.50013L2.61781 15.3823L1.5 14.2645L7.26438 8.50013Z" fill="black" stroke="black" strokeWidth="1.5"/>
    </svg>
  )
}

export function DropdownIcon({ width = 9, height = 6 }){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 9 6" fill="none">
      <path d="M4.66773 5.74177C4.58887 5.86318 4.41113 5.86318 4.33227 5.74177L0.80355 0.308941C0.717128 0.175887 0.812617 0 0.971274 0L8.02873 0C8.18738 0 8.28287 0.175887 8.19645 0.308941L4.66773 5.74177Z" fill="#898989"/>
    </svg>
  )
}