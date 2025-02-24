import { Thermometer, ArrowUp, ArrowDown, SunSnow } from 'lucide-react'; 

export default function CurrentCard(props) {
  return (
    <div className='flex items-center p-4 bg-white shadow-md 
    rounded-lg max-w-md mx-auto'>
      <div className='flex items-center space-x-4'>
        <div className='text-left'>
          <h2 className='text-xl font-bold'>{props.name}</h2>
          <div className='flex items-center'>
            <img 
              src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
              className='w-12 h-12'
            />
            <p className='ml-2'>{props.description}</p>
          </div>
        </div>
      </div>
      <div className='ml-auto grid grid-cols-2 gap-4'>
        <div className='flex items-center'>
          <Thermometer className='mr-2 text-red-500' />
          <p>{Math.round(props.temp)}ºC</p>
        </div>
        <div className='flex items-center'>
          <ArrowUp className='mr-2  text-green-500' />
          <p>{Math.round(props.temp_max)}ºC</p>
        </div>
        <div className='flex items-center'>
          <ArrowDown className='mr-2 text-blue-500' />
          <p>{Math.round(props.temp_min)}ºC</p>
        </div>
        <div className='flex items-center'>
          <SunSnow className='mr-2 text-purple-500' />
          <p>{Math.round(props.feels_like)}ºC</p>
        </div>
      </div>
    </div>
  )
}