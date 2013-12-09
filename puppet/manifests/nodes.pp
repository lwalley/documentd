node default {
  include apache
  apache::vhost { 'documentd':
    domain => 'documentd.local',
  }
}
