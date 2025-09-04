import React from 'react'

interface SizeProps {
  width?: number,
  height?: number
}


export function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
        <circle cx="9.21053" cy="9.21053" r="8.21053" stroke="#212121" strokeWidth="2"/>
        <path d="M15 15L21.364 21.364" stroke="#212121" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M1.36377 13.7004L13.5246 1.53962" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
      <path d="M1.36377 13.7004L13.5246 1.53962" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
      <path d="M1.36377 13.7004L13.5246 1.53962" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
      <path d="M1.36377 1.53979L13.6481 13.8241" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
      <path d="M1.36377 1.53979L13.6481 13.8241" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
      <path d="M1.36377 1.53979L13.6481 13.8241" stroke="#757575" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function SortIcon({width = 20, height = 20}: SizeProps){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.73311 1.51624C3.73311 0.954948 4.19177 0.5 4.75977 0.5H4.83978C5.40778 0.5 5.86644 0.954948 5.86644 1.51624V15.8449C5.86644 16.4062 5.40778 16.8611 4.83978 16.8611H4.75977C4.19177 16.8611 3.73311 16.4062 3.73311 15.8449V1.51624Z" fill="#595959"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.92244 13.7377C8.34911 13.3158 9.03978 13.3158 9.46645 13.7377L9.52778 13.7968C9.95178 14.2188 9.95178 14.9028 9.52778 15.3247L5.83979 18.9725C5.41313 19.3944 4.72245 19.3944 4.29578 18.9725L4.23712 18.9134C3.81046 18.4914 3.81046 17.8074 4.23712 17.3855L7.92244 13.7377Z" fill="#595959"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0.391777 15.3247C-0.0348893 14.9028 -0.0348893 14.2188 0.391777 13.7968L0.450436 13.7377C0.877103 13.3158 1.56778 13.3158 1.99445 13.7377L5.68247 17.3855C6.10913 17.8074 6.10913 18.4914 5.68247 18.9134L5.62111 18.9725C5.19444 19.3944 4.5038 19.3944 4.07713 18.9725L0.391777 15.3247Z" fill="#595959"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.9731 2.61111C19.5411 2.61111 19.9998 3.06606 19.9998 3.62735V3.70598C19.9998 4.26727 19.5411 4.72222 18.9731 4.72222H8.22643C7.65843 4.72222 7.19977 4.26727 7.19977 3.70598V3.62735C7.19977 3.06606 7.65843 2.61111 8.22643 2.61111H18.9731Z" fill="#595959"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.0398 6.30556C16.6078 6.30556 17.0664 6.7605 17.0664 7.3218V7.40043C17.0664 7.96172 16.6078 8.41667 16.0398 8.41667H8.22643C7.65843 8.41667 7.19977 7.96172 7.19977 7.40043V7.3218C7.19977 6.7605 7.65843 6.30556 8.22643 6.30556H16.0398Z" fill="#595959"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.6398 10C14.2078 10 14.6664 10.4549 14.6664 11.0162V11.0949C14.6664 11.6562 14.2078 12.1111 13.6398 12.1111H8.22643C7.65843 12.1111 7.19977 11.6562 7.19977 11.0949V11.0162C7.19977 10.4549 7.65843 10 8.22643 10H13.6398Z" fill="#595959"/>
    </svg>
  )
}